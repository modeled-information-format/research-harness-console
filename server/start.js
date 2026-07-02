// server/start.js
// (run with: node server/start.js)
//
// Standalone server mode: the same bridge Electron embeds, run without
// Electron and opened in any browser. Useful on a headless machine, for
// quick iteration (`npm run server`), or as the process an MCP-adjacent
// setup keeps running in the background.
//
// Usage:
//   node server/start.js /path/to/research-harness-clone
//   HARNESS_ROOT=/path/to/research-harness-clone node server/start.js
//
// Binds 127.0.0.1 only by default -- local-only is the point. Set HOST to
// something else deliberately if you want another device on your LAN to see it.

const http = require('http');
const { createApp } = require('./bridge');

let harnessRoot = process.argv[2] || process.env.HARNESS_ROOT || process.cwd();

const bridge = createApp({
  getRoot: function () { return harnessRoot; },
  setRoot: function (r) { harnessRoot = r; bridge.watch(harnessRoot); },
  allowRemoteConfig: true,
});

const PORT = process.env.PORT || 4317;
const HOST = process.env.HOST || '127.0.0.1';

const server = http.createServer(bridge.app);
server.listen(PORT, HOST, function () {
  bridge.watch(harnessRoot);
  console.log('Research Harness Console -- server mode');
  console.log('  harness root : ' + harnessRoot);
  console.log('  open         : http://' + HOST + ':' + PORT + '/');
});
