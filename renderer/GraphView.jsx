/* global React */
// GraphView -- the live knowledge graph for one or every topic. Fetches
// /api/graph (built fresh from reports/<topic>/findings/*.json on every
// request -- see server/mif-graph.js), refetches whenever `refreshToken`
// changes (App.jsx bumps it on the SSE "changed" event), and mirrors the
// design system's own ui_kits/graph-explorer pattern: a left rail (topic +
// dimension filters, then a node inspector) and the KnowledgeGraph canvas
// filling the rest.

const graphRailLabel = {
  fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.12em',
  textTransform: 'uppercase', color: 'var(--muted)', padding: '0 0.4rem 0.6rem',
};
const graphSectionLabel = {
  fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em',
  textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.5rem',
};

// Lightweight collapsible section for the sidebar -- no Accordion primitive ships
// in this app's design-system bundle, so this mirrors the same chevron-toggle
// pattern ReportsView.jsx already uses for its topic tree.
function AccordionSection(props) {
  const open = props.open;
  const onToggle = props.onToggle;
  const title = props.title;
  const trailing = props.trailing;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: (open && props.grow) ? 1 : 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0 0.4rem 0.6rem' }}>
        <button
          onClick={onToggle}
          style={{
            flex: 1, textAlign: 'left', border: 'none', background: 'transparent',
            cursor: 'pointer', font: 'inherit', display: 'flex', alignItems: 'center', gap: '0.4rem',
            padding: 0, color: 'var(--text)', minWidth: 0,
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', width: '0.7rem', flex: 'none' }}>{open ? '▾' : '▸'}</span>
          <span style={graphRailLabel}>{title}</span>
        </button>
        {trailing}
      </div>
      {open && <div style={{ flex: props.grow ? 1 : 'none', minHeight: 0, overflowY: props.grow ? 'auto' : 'visible' }}>{props.children}</div>}
    </div>
  );
}

// One filterable facet (Dimensions/Ontology/Namespace) over finding nodes: the
// distinct values present, per-value counts, and a toggleable active subset
// (null activeRaw == "all"). Shared so the three facets don't triplicate the
// same set-toggle logic.
const FACET_NONE = '(none)';

function useFacet(nodes, field) {
  const [activeRaw, setActiveRaw] = React.useState(null);
  const values = React.useMemo(function () {
    const set = new Set();
    nodes.forEach(function (n) { if (n.kind === 'finding') set.add(n[field] || FACET_NONE); });
    return Array.from(set).sort();
  }, [nodes, field]);
  const activeSet = React.useMemo(function () {
    return activeRaw || new Set(values);
  }, [activeRaw, values]);
  const counts = React.useMemo(function () {
    const c = {};
    nodes.forEach(function (n) { if (n.kind === 'finding') { const v = n[field] || FACET_NONE; c[v] = (c[v] || 0) + 1; } });
    return c;
  }, [nodes, field]);
  function toggle(v) {
    setActiveRaw(function (prev) {
      const base = prev || new Set(values);
      const next = new Set(base);
      if (next.has(v) && next.size === 1) return base;
      if (next.has(v)) next.delete(v); else next.add(v);
      return next;
    });
  }
  function reset() { setActiveRaw(null); }
  function selectAll() { setActiveRaw(new Set(values)); }
  function selectNone() { setActiveRaw(new Set()); }
  return {
    values: values, activeSet: activeSet, counts: counts, toggle: toggle,
    reset: reset, selectAll: selectAll, selectNone: selectNone,
  };
}

// A facet's checkbox list (Dimensions/Ontology/Namespace), with an in-list search
// box once the list is long enough to need one. `renderExtra(value)` lets a caller
// append a per-row control (Dimensions uses this for the cluster expand toggle).
function FacetSection(props) {
  const NS = props.NS;
  const Checkbox = NS.Checkbox, Input = NS.Input, Button = NS.Button;
  const facet = props.facet;
  const [search, setSearch] = React.useState('');
  const needle = search.trim().toLowerCase();
  const shown = needle ? facet.values.filter(function (v) { return v.toLowerCase().includes(needle); }) : facet.values;
  return (
    <AccordionSection
      title={props.title}
      open={props.open}
      onToggle={props.onToggle}
      trailing={<span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--muted)', marginLeft: 'auto' }}>{facet.values.length}</span>}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', padding: '0 0.4rem' }}>
          <Button variant="secondary" size="sm" onClick={facet.selectAll}>Select all</Button>
          <Button variant="secondary" size="sm" onClick={facet.selectNone}>Unselect all</Button>
        </div>
        {props.toolbar}
        {facet.values.length > 8 && (
          <Input
            value={search}
            onChange={function (e) { setSearch(e.target.value); }}
            placeholder={'Search ' + props.title.toLowerCase() + '…'}
            style={{ margin: '0 0.4rem' }}
          />
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
          {shown.map(function (v) {
            return (
              <div key={v} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.3rem 0.4rem' }}>
                <Checkbox checked={facet.activeSet.has(v)} onChange={function () { facet.toggle(v); }} label={v} style={{ alignSelf: 'stretch', minWidth: 0 }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted)' }}>{facet.counts[v] || 0}</span>
                  {props.renderExtra && props.renderExtra(v)}
                </div>
              </div>
            );
          })}
          {shown.length === 0 && (
            <div style={{ padding: '0 0.4rem', fontSize: '0.8rem', color: 'var(--muted)' }}>
              {facet.values.length === 0 ? 'No findings yet.' : 'No matches.'}
            </div>
          )}
        </div>
      </div>
    </AccordionSection>
  );
}

// Topic picker: single-select, but with an in-list search matching against every
// piece of a topic's metadata (id, title, namespace, status, ontologies) -- not
// just the visible name, since two topics can share a near-identical title.
function TopicSection(props) {
  const NS = props.NS;
  const Input = NS.Input;
  const [search, setSearch] = React.useState('');
  const needle = search.trim().toLowerCase();
  const topics = props.topics;
  const shown = React.useMemo(function () {
    if (!needle) return topics;
    return topics.filter(function (t) {
      const haystack = [t.id, t.title, t.namespace, t.status].concat(t.ontologies || []).filter(Boolean).join(' ').toLowerCase();
      return haystack.includes(needle);
    });
  }, [topics, needle]);

  function topicRow(id, title, meta, isActive) {
    return (
      <button
        key={id}
        onClick={function () { props.onSelect(id); }}
        style={{
          textAlign: 'left', border: '1px solid ' + (isActive ? 'var(--machine)' : 'var(--border)'),
          background: isActive ? 'var(--elevated)' : 'transparent', borderRadius: 'var(--radius-md)',
          padding: '0.5rem 0.65rem', cursor: 'pointer', color: 'var(--text)',
          font: 'inherit', fontSize: '0.85rem', lineHeight: 1.4, display: 'flex', flexDirection: 'column', gap: '0.15rem',
        }}
      >
        <span>{title}</span>
        {meta && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--muted)' }}>{meta}</span>}
      </button>
    );
  }

  return (
    <AccordionSection title="Topic" open={props.open} onToggle={props.onToggle}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Input
          value={search}
          onChange={function (e) { setSearch(e.target.value); }}
          placeholder="Search topics by name, namespace, ontology…"
          style={{ margin: '0 0.4rem' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', maxHeight: '18rem', overflowY: 'auto', padding: '0 0.15rem' }}>
          {!needle && topicRow('__all__', 'All topics', null, props.value === '__all__')}
          {shown.map(function (t) {
            const meta = [t.namespace, t.status, (t.ontologies || []).join(', ')].filter(Boolean).join(' · ');
            return topicRow(t.id, t.title || t.id, meta, props.value === t.id);
          })}
          {shown.length === 0 && <div style={{ padding: '0 0.4rem', fontSize: '0.8rem', color: 'var(--muted)' }}>No matches.</div>}
        </div>
      </div>
    </AccordionSection>
  );
}

function GraphView(props) {
  const NS = props.NS;
  const apiBase = props.apiBase;
  const topics = props.topics;
  const refreshToken = props.refreshToken;
  const onOpenTopicReports = props.onOpenTopicReports;
  const KnowledgeGraph = NS.KnowledgeGraph, MemoryRecord = NS.MemoryRecord, TypeBadge = NS.TypeBadge,
    Badge = NS.Badge, FrontmatterRow = NS.FrontmatterRow, RelationshipEdge = NS.RelationshipEdge,
    Button = NS.Button, IconButton = NS.IconButton, Input = NS.Input;

  const [topicFilter, setTopicFilter] = React.useState('__all__');
  const [graph, setGraph] = React.useState({ nodes: [], edges: [] });
  const [loading, setLoading] = React.useState(true);
  const [nameFilter, setNameFilter] = React.useState('');
  const [selected, setSelected] = React.useState(null);
  const [expanded, setExpanded] = React.useState(null);
  const [openSections, setOpenSections] = React.useState(function () { return new Set(['topic', 'inspector']); });
  const [collapsedDims, setCollapsedDims] = React.useState(function () { return new Set(); }); // empty == fully expanded (default)

  const dimFacet = useFacet(graph.nodes, 'group');
  const ontologyFacet = useFacet(graph.nodes, 'ontology');
  const namespaceFacet = useFacet(graph.nodes, 'namespace');

  function toggleSection(id) {
    setOpenSections(function (prev) {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function toggleDimCollapsed(d) {
    setCollapsedDims(function (prev) {
      const next = new Set(prev);
      if (next.has(d)) next.delete(d); else next.add(d);
      return next;
    });
  }

  function expandAllDims() { setCollapsedDims(new Set()); }
  function collapseAllDims() { setCollapsedDims(new Set(dimFacet.values)); }

  React.useEffect(function () {
    setLoading(true);
    const url = apiBase + '/api/graph' + (topicFilter !== '__all__' ? ('?topic=' + encodeURIComponent(topicFilter)) : '');
    fetch(url).then(function (r) { return r.json(); }).then(function (data) {
      setGraph(data);
      dimFacet.reset();
      ontologyFacet.reset();
      namespaceFacet.reset();
      setNameFilter('');
      setCollapsedDims(new Set());
      setSelected(null);
      setExpanded(null);
      setLoading(false);
    }).catch(function () { setLoading(false); });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicFilter, refreshToken, apiBase]);

  const nameNeedle = nameFilter.trim().toLowerCase();

  const visibleNodes = React.useMemo(function () {
    return graph.nodes.filter(function (n) {
      if (nameNeedle && !(n.label || '').toLowerCase().includes(nameNeedle)) return false;
      if (n.kind !== 'finding') return true;
      if (!dimFacet.activeSet.has(n.group || FACET_NONE)) return false;
      if (!ontologyFacet.activeSet.has(n.ontology || FACET_NONE)) return false;
      if (!namespaceFacet.activeSet.has(n.namespace || FACET_NONE)) return false;
      return true;
    });
  }, [graph.nodes, nameNeedle, dimFacet.activeSet, ontologyFacet.activeSet, namespaceFacet.activeSet]);

  // Findings default to fully expanded; collapsing a dimension (via the Dimensions
  // list toggle, a canvas cluster click, or Collapse all) replaces its findings with
  // one cluster node. Entities only show once the finding(s) that reference them
  // are visible.
  const displayNodes = React.useMemo(function () {
    const out = [];
    const collapsedCounts = new Map();
    const entityCandidates = [];
    visibleNodes.forEach(function (n) {
      if (n.kind !== 'finding') { entityCandidates.push(n); return; }
      if (!collapsedDims.has(n.group)) { out.push(n); return; }
      collapsedCounts.set(n.group, (collapsedCounts.get(n.group) || 0) + 1);
    });
    collapsedCounts.forEach(function (count, d) {
      out.push({
        id: 'cluster:' + d, label: d + ' (' + count + ')', type: 'semantic',
        group: d, kind: 'cluster', dimension: d, count: count,
      });
    });
    if (entityCandidates.length) {
      const visibleIds = new Set(out.map(function (n) { return n.id; }));
      const keep = new Set();
      graph.edges.forEach(function (e) {
        if (visibleIds.has(e.source) && !visibleIds.has(e.target)) keep.add(e.target);
        else if (visibleIds.has(e.target) && !visibleIds.has(e.source)) keep.add(e.source);
      });
      entityCandidates.forEach(function (n) { if (keep.has(n.id)) out.push(n); });
    }
    return out;
  }, [visibleNodes, collapsedDims, graph.edges]);

  const byId = React.useMemo(function () {
    return new Map(graph.nodes.map(function (n) { return [n.id, n]; }));
  }, [graph.nodes]);

  const related = selected ? graph.edges.filter(function (e) { return e.source === selected.id || e.target === selected.id; }) : [];

  function expand(node) {
    fetch(apiBase + '/api/record?id=' + encodeURIComponent(node.id))
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (rec) { if (rec) setExpanded(rec); });
  }

  function selectNode(node) {
    if (!node) { setSelected(null); return; }
    if (node.kind === 'cluster') { toggleDimCollapsed(node.dimension); return; }
    setSelected(node);
    setOpenSections(function (prev) { return new Set(prev).add('inspector'); });
  }

  function verdictTone(v) {
    if (v === 'falsified') return 'pink';
    if (v === 'survived') return 'green';
    if (v === 'weakened') return 'violet';
    return 'neutral';
  }

  return (
    <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
      <aside style={{
        width: '21rem', flex: 'none', background: 'var(--void)', borderRight: '1px solid var(--hairline)',
        padding: '1.1rem 0.9rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem', overflowY: 'auto', minHeight: 0,
      }}>
        <Input
          value={nameFilter}
          onChange={function (e) { setNameFilter(e.target.value); }}
          placeholder="Filter by name…"
          leadingIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" /><path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>}
        />

        {topics.length > 1 && (
          <TopicSection
            NS={NS}
            topics={topics}
            value={topicFilter}
            onSelect={setTopicFilter}
            open={openSections.has('topic')}
            onToggle={function () { toggleSection('topic'); }}
          />
        )}

        <FacetSection
          NS={NS}
          title="Dimensions"
          open={openSections.has('dimensions')}
          onToggle={function () { toggleSection('dimensions'); }}
          facet={dimFacet}
          toolbar={
            <div style={{ display: 'flex', gap: '0.5rem', padding: '0 0.4rem' }}>
              <Button variant="secondary" size="sm" onClick={expandAllDims}>Expand all</Button>
              <Button variant="secondary" size="sm" onClick={collapseAllDims}>Collapse all</Button>
            </div>
          }
          renderExtra={function (d) {
            const isCollapsed = collapsedDims.has(d);
            return (
              <IconButton label={isCollapsed ? 'Expand ' + d + ' into individual findings' : 'Collapse ' + d + ' into a cluster'} size="sm" onClick={function () { toggleDimCollapsed(d); }}>
                {isCollapsed ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                )}
              </IconButton>
            );
          }}
        />

        <FacetSection NS={NS} title="Ontology" open={openSections.has('ontology')} onToggle={function () { toggleSection('ontology'); }} facet={ontologyFacet} />
        <FacetSection NS={NS} title="Namespace" open={openSections.has('namespace')} onToggle={function () { toggleSection('namespace'); }} facet={namespaceFacet} />

        <AccordionSection
          title="Inspector"
          open={openSections.has('inspector')}
          onToggle={function () { toggleSection('inspector'); }}
          grow={!!selected}
          trailing={selected && (
            <IconButton label="Clear selection" size="sm" onClick={function () { setSelected(null); setExpanded(null); }} style={{ marginLeft: 'auto' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </IconButton>
          )}
        >
          {!selected ? (
            <div style={{ margin: '0 0.4rem', padding: '0.9rem', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border)', color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.6 }}>
              Click a node to inspect its type, dimension, and typed relationships.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', padding: '0 0.15rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {selected.kind === 'finding' && (
                  <Button variant="secondary" size="sm" onClick={function () { expand(selected); }}>
                    Open document
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ marginLeft: '0.3rem' }}><path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Button>
                )}
                {selected.topic && onOpenTopicReports && (
                  <Button variant="secondary" size="sm" onClick={function () { onOpenTopicReports(selected.topic); }}>
                    Open reports
                  </Button>
                )}
                {selected.kind !== 'finding' && !selected.topic && (
                  <span style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                    Unresolved reference — no document in the loaded corpus for this id.
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <TypeBadge type={selected.type} />
                <Badge tone="neutral">{selected.kind}</Badge>
                {selected.verdict && <Badge tone={verdictTone(selected.verdict)}>{selected.verdict}</Badge>}
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.5 }}>{selected.detail}</div>
              <div style={{ background: 'var(--elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '0.2rem 0.9rem' }}>
                <FrontmatterRow name="@id">{selected.id}</FrontmatterRow>
                <FrontmatterRow name="conceptType" tone="muted">{selected.type}</FrontmatterRow>
                {selected.dimension && <FrontmatterRow name="dimension" tone="muted">{selected.dimension}</FrontmatterRow>}
                <FrontmatterRow name="topic" tone="human" style={{ borderBottom: 'none' }}>{selected.topic || '—'}</FrontmatterRow>
              </div>
              <div>
                <div style={graphSectionLabel}>Typed relationships ({related.length})</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-start' }}>
                  {related.length === 0 && <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>No edges in the current filter.</span>}
                  {related.map(function (e, i) {
                    const otherId = e.source === selected.id ? e.target : e.source;
                    const other = byId.get(otherId);
                    const outbound = e.source === selected.id;
                    const edgeEl = (
                      <RelationshipEdge
                        source={outbound ? 'this' : (other ? other.label : otherId)}
                        type={e.type}
                        target={outbound ? (other ? other.label : otherId) : 'this'}
                        style={{ maxWidth: '100%' }}
                      />
                    );
                    if (!other) return <div key={i}>{edgeEl}</div>;
                    return (
                      <button
                        key={i}
                        onClick={function () { selectNode(other); }}
                        title={'Select ' + other.label}
                        style={{ border: 'none', background: 'transparent', padding: 0, cursor: 'pointer', textAlign: 'left', maxWidth: '100%' }}
                      >
                        {edgeEl}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </AccordionSection>
      </aside>

      <main style={{ flex: 1, minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column', padding: '1.1rem 1.25rem 1.25rem' }}>
        {loading ? (
          <div style={{ margin: 'auto', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>Loading graph…</div>
        ) : graph.nodes.length === 0 ? (
          <div style={{ margin: 'auto', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textAlign: 'center', maxWidth: '26rem', lineHeight: 1.6 }}>
            No findings on disk yet for this harness. The graph updates live as a research session lands findings under reports/&lt;topic&gt;/findings/.
          </div>
        ) : (
          <KnowledgeGraph nodes={displayNodes} edges={graph.edges} height="100%" iterations={160} onSelectNode={selectNode} style={{ flex: 1, minHeight: 0 }} />
        )}
      </main>

      {expanded && <MemoryRecord record={expanded} onClose={function () { setExpanded(null); }} />}
    </div>
  );
}

window.GraphView = GraphView;
