// server/mif-graph.js
//
// Pure read-side logic over a MIF Research Harness clone's reports/ tree.
// Shared by the HTTP bridge (server/bridge.js) and the MCP server
// (server/mcp-server.js) so the console UI and any MCP client (Claude Desktop,
// Claude Code, or another agent) see the exact same data, computed the exact
// same way. Nothing here writes to disk -- it only reads what the harness
// (or a person, via git) already produced.

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function readJSON(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function safeReaddir(dir) {
  try { return fs.readdirSync(dir); } catch (e) { return []; }
}

function loadConfig(harnessRoot) {
  if (!harnessRoot) return null;
  const cfgPath = path.join(harnessRoot, 'harness.config.json');
  if (!fs.existsSync(cfgPath)) return null;
  try { return readJSON(cfgPath); } catch (e) { return null; }
}

function listTopics(harnessRoot) {
  const cfg = loadConfig(harnessRoot);
  return (cfg && cfg.topics) || [];
}

function findingsDir(harnessRoot, topicId) {
  return path.join(harnessRoot, 'reports', topicId, 'findings');
}

function topicReportsDir(harnessRoot, topicId) {
  return path.join(harnessRoot, 'reports', topicId);
}

function loadFindings(harnessRoot, topicId) {
  const dir = findingsDir(harnessRoot, topicId);
  return safeReaddir(dir)
    .filter(function (f) { return f.endsWith('.json'); })
    .map(function (f) {
      try { return readJSON(path.join(dir, f)); } catch (e) { return null; }
    })
    .filter(Boolean);
}

// Build one merged graph across the given topic ids -- mirrors
// scripts/build-graph.sh's contract (SPEC §6c): a node per finding concept, a
// node per referenced MIF entity, typed relationship edges, and a "mentions"
// edge finding->entity. Relationship targets outside the scanned corpus
// (cross-topic or external references) are materialized as stub nodes so
// every edge resolves to something the graph can draw.
function buildGraphForTopics(harnessRoot, topicIds) {
  const nodesById = new Map();
  const edges = [];
  const recordsById = new Map();

  topicIds.forEach(function (topicId) {
    loadFindings(harnessRoot, topicId).forEach(function (f) {
      const id = f['@id'];
      if (!id) return;
      const harness = (f.extensions && f.extensions.harness) || {};
      const verdict = harness.verification && harness.verification.verdict;

      nodesById.set(id, {
        id: id,
        label: f.title || id,
        type: f.conceptType || 'semantic',
        group: harness.dimension || topicId,
        topic: topicId,
        dimension: harness.dimension || null,
        ontology: (f.ontology && f.ontology.id) || null,
        namespace: f.namespace || null,
        kind: 'finding',
        verdict: verdict || null,
        detail: f.summary || f.title || id,
      });
      recordsById.set(id, f);

      (f.relationships || []).forEach(function (r) {
        const target = typeof r.target === 'object' ? (r.target['@id'] || r.target.id) : r.target;
        if (!target) return;
        edges.push({
          source: id,
          target: target,
          type: r.type || r.relationshipType || 'relates-to',
          strength: typeof r.strength === 'number' ? r.strength : null,
          via: 'relationship',
        });
      });

      (f.entities || []).forEach(function (e) {
        const eid = e.entity && (e.entity['@id'] || e.entity.id);
        if (!eid) return;
        if (!nodesById.has(eid)) {
          nodesById.set(eid, {
            id: eid,
            label: e.name || eid,
            type: 'semantic',
            group: topicId,
            topic: topicId,
            kind: 'entity',
            entityType: e.entityType || null,
            detail: e.name || eid,
          });
        }
        edges.push({ source: id, target: eid, type: 'mentions', strength: null, via: 'entity' });
      });
    });
  });

  edges.forEach(function (e) {
    if (!nodesById.has(e.target)) {
      nodesById.set(e.target, {
        id: e.target,
        label: e.target.split(':').pop() || e.target,
        type: 'semantic',
        group: 'external',
        topic: null,
        kind: 'entity',
        external: true,
        detail: e.target,
      });
    }
  });

  return { nodes: Array.from(nodesById.values()), edges: edges, recordsById: recordsById };
}

// Flatten a raw finding JSON (MIF + the harness's verification extension) to
// the MemoryRecord component's MIFRecord shape.
function toMIFRecord(finding, nodesById) {
  if (!finding) return null;
  const harness = (finding.extensions && finding.extensions.harness) || {};
  return {
    id: finding['@id'],
    type: finding['@type'] === 'Memory' ? 'Memory' : 'Concept',
    conceptType: finding.conceptType || 'semantic',
    title: finding.title,
    summary: finding.summary,
    content: finding.content,
    created: finding.created,
    modified: finding.modified,
    ontology: finding.ontology,
    namespace: finding.namespace,
    tags: finding.tags,
    entities: (finding.entities || []).map(function (e) {
      return { name: e.name, entityType: e.entityType };
    }),
    relationships: (finding.relationships || []).map(function (r) {
      const target = typeof r.target === 'object' ? (r.target['@id'] || r.target.id) : r.target;
      const t = nodesById.get(target);
      return { type: r.type, target: target, targetLabel: t ? t.label : target, strength: r.strength };
    }),
    temporal: finding.temporal,
    provenance: finding.provenance,
    citations: finding.citations,
    dimension: harness.dimension || null,
    verdict: (harness.verification && harness.verification.verdict) || null,
    verdictBasis: (harness.verification && harness.verification.verdict_basis) || null,
  };
}

function listReports(harnessRoot, topicIds) {
  const out = [];
  topicIds.forEach(function (topicId) {
    const dir = topicReportsDir(harnessRoot, topicId);
    safeReaddir(dir).filter(function (f) { return f.endsWith('.md'); }).forEach(function (f) {
      const full = path.join(dir, f);
      let stat;
      try { stat = fs.statSync(full); } catch (e) { return; }
      out.push({ topic: topicId, slug: f.replace(/\.md$/, ''), mtime: stat.mtimeMs, size: stat.size });
    });
  });
  return out.sort(function (a, b) { return b.mtime - a.mtime; });
}

function readReport(harnessRoot, topicId, slug) {
  const full = path.join(topicReportsDir(harnessRoot, topicId), slug + '.md');
  if (!fs.existsSync(full)) return null;
  const raw = fs.readFileSync(full, 'utf8');
  const parsed = matter(raw);
  return { topic: topicId, slug: slug, frontmatter: parsed.data, content: parsed.content };
}

function search(harnessRoot, topicIds, query) {
  const q = (query || '').toLowerCase().trim();
  if (!q) return [];
  const built = buildGraphForTopics(harnessRoot, topicIds);
  const results = [];
  built.nodes.filter(function (n) { return n.kind === 'finding'; }).forEach(function (n) {
    const f = built.recordsById.get(n.id);
    const hay = [f.title, f.summary, (f.tags || []).join(' ')].filter(Boolean).join(' ').toLowerCase();
    if (hay.indexOf(q) !== -1) {
      results.push({ kind: 'finding', id: n.id, title: f.title, summary: f.summary, topic: n.topic, verdict: n.verdict });
    }
  });
  listReports(harnessRoot, topicIds).forEach(function (r) {
    const hay = r.slug.replace(/-/g, ' ').toLowerCase();
    if (hay.indexOf(q) !== -1) {
      results.push({ kind: 'report', topic: r.topic, slug: r.slug, title: r.slug.replace(/-/g, ' ') });
    }
  });
  return results.slice(0, 100);
}

module.exports = {
  loadConfig: loadConfig,
  listTopics: listTopics,
  buildGraphForTopics: buildGraphForTopics,
  toMIFRecord: toMIFRecord,
  listReports: listReports,
  readReport: readReport,
  search: search,
  findingsDir: findingsDir,
  topicReportsDir: topicReportsDir,
};
