# Research Harness Console

A local-only desktop console for a **[Research Harness](https://github.com/modeled-information-format/research-harness-template)**
clone: a live knowledge graph, a report reader, and corpus search over its
`reports/` directory — plus an MCP server so Claude can read the exact same
live corpus. Built with the MIF design system (this project) for its UI, and
otherwise standalone: it is not part of the design system's compiled bundle,
templates, or component set — copy this `apps/research-harness-console/`
folder out into its own repo.

## Why this exists

The harness template already produces everything this needs on disk: typed
MIF findings (`reports/<topic>/findings/*.json`), synthesized reports
(`reports/<topic>/<slug>.md`), and (via its own `scripts/build-graph.sh`) the
exact node/edge shape a knowledge graph wants. This app reads that tree live —
no separate ingestion step, no database, nothing written back except what the
harness itself already writes. It is a *view* over a git-native corpus.

## Architecture

```
main.js            Electron main process: opens a BrowserWindow, starts the
                    embedded bridge server on an OS-assigned localhost port,
                    and owns the native "choose harness folder" dialog.
preload.js          contextBridge: exposes window.harnessConsole to the
                    renderer (folder picker only — no raw Node/fs access).
server/
  mif-graph.js       Pure read-side logic: parse harness.config.json, scan
                     findings/*.json into a graph, flatten a finding to the
                     MemoryRecord shape, list/read reports, search. No
                     framework code — shared verbatim by the HTTP bridge and
                     the MCP server.
  bridge.js          Express app: serves the renderer, /api/* JSON routes,
                     and an SSE stream that fires whenever chokidar sees the
                     harness write a new file.
  start.js           Standalone entry point — runs the same bridge without
                     Electron: `node server/start.js /path/to/harness`, then
                     open the printed http://127.0.0.1:4317/ in any browser.
  mcp-server.js       The harness's data, exposed over MCP (stdio transport)
                      for Claude Desktop / Claude Code / any MCP client.
renderer/
  index.html, App.jsx, GraphView.jsx, ReportsView.jsx, SearchView.jsx,
  lib/miniMarkdown.js
                     Plain React + in-browser Babel (no build step), same
                     pattern as this design system's own ui_kits/. React,
                     ReactDOM, and Babel are served from node_modules (see
                     "Fully offline" below), not a CDN.
  vendor/mif-ds/     A copy of this design system's styles.css, tokens/,
                     assets/, and _ds_bundle.js — vendored so this app has no
                     dependency on the design-system project at runtime.
```

### Data flow

1. `harness.config.json` → the topic list.
2. `reports/<topic>/findings/*.json` → scanned fresh on every request into
   `{nodes, edges}` (concept per finding, entity per referenced MIF entity,
   typed relationship + "mentions" edges) — the same contract as the
   harness's own `scripts/build-graph.sh`.
3. `reports/<topic>/<slug>.md` → listed and read for the Reports view
   (frontmatter + body via `gray-matter`).
4. A `chokidar` watcher on `reports/` broadcasts an SSE `changed` event on any
   add/change/unlink, so the console re-fetches without a manual refresh —
   this is the "live" behavior a running research session should produce.

## Running it

```
cd apps/research-harness-console
npm install

# Desktop app:
npm start

# Or headless/dev, any browser:
npm run server -- /path/to/your-research-harness-clone
# then open the printed http://127.0.0.1:4317/
```

On first launch the Electron app asks you to choose your harness clone's
folder (native dialog); it's remembered for next time. In server mode, pass
the path as an argument or `HARNESS_ROOT` env var.

### Fully offline

`npm install` needs the network once. After that, `npm start` / `npm run
server` make zero outbound requests: React, ReactDOM, and Babel-standalone are
served straight out of `node_modules` (see `server/bridge.js`'s `/vendor/*`
routes) rather than a CDN, and the design-system assets are vendored locally
under `renderer/vendor/mif-ds/`.

## Talking to Claude over MCP

```
npm install    # pulls in @modelcontextprotocol/sdk + zod too
HARNESS_ROOT=/path/to/your-research-harness-clone npm run mcp
```

Register it with an MCP client, e.g. in Claude Desktop's
`claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "research-harness": {
      "command": "node",
      "args": ["/absolute/path/to/research-harness-console/server/mcp-server.js"],
      "env": { "HARNESS_ROOT": "/absolute/path/to/your-research-harness-clone" }
    }
  }
}
```

That gives Claude six read tools — `list_topics`, `get_graph`, `get_record`,
`list_reports`, `get_report`, `search` — over `server/mif-graph.js`, the exact
module the console UI itself calls. Human and agent read one corpus, computed
one way.

> The `@modelcontextprotocol/sdk` surface moves fast between versions. If
> `server.tool(...)` doesn't match your installed version's signature, check
> that package's own docs/examples — the tool bodies (the read logic) won't
> need to change, only the registration call.

## Roadmap: the app as the prime interface to the agent

This is scaffolded toward — not yet at — a two-way relationship with the
agent, per the brief that shaped it. Three phases, in order of how much new
protocol surface each needs:

1. **Read-only MCP (done).** Claude reads the live corpus through the six
   tools above — the same data the console shows a person.
2. **Live status, not just live files.** Right now the console only reacts to
   *files* the harness writes. The next step is a couple of MCP tools the
   *agent* calls mid-session — `report_status`, `report_goal` — that
   `bridge.js` turns into the same SSE broadcast `chokidar` already uses, so
   "currently investigating: <dimension>" or a falsification verdict the
   instant it lands shows up in the console without waiting on a file write.
   This needs the MCP server and the HTTP bridge to share one process (or a
   small IPC link between the two, since Claude Desktop launches the MCP
   server itself) — worth doing once phase 1 is in daily use and the exact
   status vocabulary is clear.
3. **The console as the interface, not just a viewer.** Tools that let a
   person *drive* the agent from the UI — kick off a research session on a
   topic, ask a follow-up, request re-falsification of a specific finding —
   turning today's one-way graph/reports/search viewer into the primary way
   both a person and Claude interact with the harness. This is a real product
   direction, not a small addition; scope it as its own round once 1–2 are
   solid.

## Extending it

Adding a fourth module (findings feed, falsification-gate monitor, whatever
comes next) is: write a `server/mif-graph.js` read function if it needs new
data, an `/api/*` route in `bridge.js` (and a matching MCP tool in
`mcp-server.js` if Claude should read it too), a `renderer/<Name>View.jsx`
following `GraphView.jsx`'s shape, one `NAV` entry and one render line in
`App.jsx`.

## Documentation, governance & releases

This repo follows the shared CI/release governance of the
[`modeled-information-format`](https://github.com/modeled-information-format) org — see
[`docs/README.md`](docs/README.md) for the org-governance reference, the full gate/workflow
listing, and the runbook for a red CI or release check. Verifying a downloaded release artifact's
attestation is covered in [`SECURITY.md`](SECURITY.md).

## Known gaps (v1)

- Recomputes the full graph/search index from disk on every request — fine at
  harness scale (dozens–hundreds of findings), would want caching well past
  that.
- No auth of any kind — this binds `127.0.0.1` only and assumes a single
  local user, matching the harness template's own single-user design.
- The Reports view's markdown rendering (`lib/miniMarkdown.js`) is a small
  hand-rolled subset (headings, lists, links, code, blockquotes) chosen to
  avoid a CDN dependency — no tables or Mermaid yet. Swap in a real renderer
  (served from `node_modules` the same way React is) if a report needs more.
