// server/mcp-server.js
// (run with: node server/mcp-server.js)
//
// Exposes this same harness reports/ tree over MCP so Claude (Claude Desktop,
// Claude Code, or any other MCP client) can read the exact live corpus the
// console UI shows -- same mif-graph.js, same data, two surfaces reading one
// source of truth.
//
// This is the first slice of the "app as prime interface to the agent" goal
// described in README.md's roadmap: today these tools are read-only. The
// natural next step is tools the agent calls to push session/status updates
// (current goal, gate verdicts as they land, "ready for review") that the
// console surfaces live over the same SSE channel it already uses for file
// changes -- that direction isn't built yet, this file is the read-side
// foundation it builds on.
//
// Run directly (stdio transport) or point a Claude Desktop / Claude Code MCP
// config at this file. Requires HARNESS_ROOT (env var or first CLI arg).
//
//   HARNESS_ROOT=/path/to/research-harness-clone node server/mcp-server.js
//
// Example Claude Desktop config entry (claude_desktop_config.json):
//   "research-harness": {
//     "command": "node",
//     "args": ["/absolute/path/to/research-harness-console/server/mcp-server.js"],
//     "env": { "HARNESS_ROOT": "/absolute/path/to/your-research-harness-clone" }
//   }
//
// NOTE: the @modelcontextprotocol/sdk surface has moved fast across versions.
// This is written against the McpServer high-level API current as of writing;
// if `server.tool(...)` errors on your installed version, check that
// package's own README/examples for the current registration signature --
// the tool bodies (the async handlers) will not need to change.

const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { z } = require('zod');
const MG = require('./mif-graph');

const harnessRoot = process.argv[2] || process.env.HARNESS_ROOT;
if (!harnessRoot) {
  console.error('mcp-server: set HARNESS_ROOT (env var) or pass the harness path as the first argument.');
  process.exit(1);
}

const server = new McpServer({ name: 'research-harness-console', version: '0.1.0' });

function text(value) {
  return { content: [{ type: 'text', text: typeof value === 'string' ? value : JSON.stringify(value, null, 2) }] };
}

function allTopicIds() {
  return MG.listTopics(harnessRoot).map(function (t) { return t.id; });
}

server.tool(
  'list_topics',
  'List the research topics configured in this harness (harness.config.json): id, title, and status.',
  {},
  async function () { return text(MG.listTopics(harnessRoot)); }
);

server.tool(
  'get_graph',
  'Get the MIF knowledge graph (nodes + typed edges) for one topic, or every topic if none is given. Same shape scripts/build-graph.sh produces.',
  { topic: z.string().optional().describe('Topic id to scope to. Omit for every configured topic.') },
  async function (args) {
    const topics = args.topic ? [args.topic] : allTopicIds();
    const built = MG.buildGraphForTopics(harnessRoot, topics);
    return text({ nodes: built.nodes, edges: built.edges });
  }
);

server.tool(
  'get_record',
  "Get one finding's full MIF record (title, summary, content, citations, provenance, typed relationships, falsification verdict) by its urn:mif: id.",
  { id: z.string().describe('The urn:mif:... id of the finding.') },
  async function (args) {
    const topics = allTopicIds();
    const built = MG.buildGraphForTopics(harnessRoot, topics);
    const finding = built.recordsById.get(args.id);
    if (!finding) return text({ error: 'not found: ' + args.id });
    const nodesById = new Map(built.nodes.map(function (n) { return [n.id, n]; }));
    return text(MG.toMIFRecord(finding, nodesById));
  }
);

server.tool(
  'list_reports',
  'List the synthesized markdown reports on disk (reports/<topic>/<slug>.md), newest first.',
  { topic: z.string().optional().describe('Topic id to scope to. Omit for every configured topic.') },
  async function (args) {
    return text(MG.listReports(harnessRoot, args.topic ? [args.topic] : allTopicIds()));
  }
);

server.tool(
  'get_report',
  "Get one report's frontmatter and full markdown body.",
  { topic: z.string(), slug: z.string() },
  async function (args) {
    const report = MG.readReport(harnessRoot, args.topic, args.slug);
    if (!report) return text({ error: 'not found: ' + args.topic + '/' + args.slug });
    return text(report);
  }
);

server.tool(
  'search',
  'Full-text search over finding titles/summaries/tags and report slugs across the corpus.',
  { query: z.string(), topic: z.string().optional() },
  async function (args) {
    return text(MG.search(harnessRoot, args.topic ? [args.topic] : allTopicIds(), args.query));
  }
);

const transport = new StdioServerTransport();
server.connect(transport).then(function () {
  console.error('research-harness-console MCP server ready -- harness root: ' + harnessRoot);
});
