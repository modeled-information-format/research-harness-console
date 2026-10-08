// server/bridge.js
//
// The local HTTP bridge: serves the renderer statically, exposes the
// harness's reports/ tree as JSON over /api/*, and pushes a lightweight SSE
// "changed" event whenever chokidar sees the harness write new files (a new
// finding, an updated verdict, a new report) so the console updates live
// without a manual refresh.
//
// Bound to 127.0.0.1 by whoever calls http.createServer(...).listen(...) --
// this module never binds a socket itself, so both main.js (Electron) and
// server/start.js (standalone) share one implementation.

const express = require('express');
const path = require('path');
const chokidar = require('chokidar');
const MG = require('./mif-graph');

function createApp(opts) {
  const getRoot = opts.getRoot;
  const setRoot = opts.setRoot;
  const allowRemoteConfig = !!opts.allowRemoteConfig;

  const app = express();
  app.use(express.json());

  // Serve React/ReactDOM/Babel straight out of node_modules -- no CDN, so the
  // console has zero network dependency once `npm install` has run once.
  app.get('/vendor/react.development.js', function (req, res) {
    res.sendFile(path.join(path.dirname(require.resolve('react/package.json')), 'umd', 'react.development.js'));
  });
  app.get('/vendor/react-dom.development.js', function (req, res) {
    res.sendFile(path.join(path.dirname(require.resolve('react-dom/package.json')), 'umd', 'react-dom.development.js'));
  });
  app.get('/vendor/babel.min.js', function (req, res) {
    res.sendFile(require.resolve('@babel/standalone/babel.min.js'));
  });
  app.get('/vendor/marked.umd.js', function (req, res) {
    res.sendFile(path.join(path.dirname(require.resolve('marked/package.json')), 'lib', 'marked.umd.js'));
  });
  app.get('/vendor/mermaid.min.js', function (req, res) {
    res.sendFile(path.join(path.dirname(require.resolve('mermaid/package.json')), 'dist', 'mermaid.min.js'));
  });
  app.get('/vendor/prism.min.js', function (req, res) {
    res.sendFile(path.join(path.dirname(require.resolve('prismjs/package.json')), 'prism.js'));
  });
  app.get('/vendor/prism-tomorrow.min.css', function (req, res) {
    res.sendFile(path.join(path.dirname(require.resolve('prismjs/package.json')), 'themes', 'prism-tomorrow.min.css'));
  });
  // Curated language set for fenced code blocks in harness reports -- markup, css,
  // clike, and javascript already ship in prism.js core. Explicit routes (no dynamic
  // :lang param) so this can't be used to read arbitrary files off disk.
  var PRISM_LANGS = [
    'typescript', 'jsx', 'tsx', 'python', 'bash', 'json', 'yaml', 'rust', 'go',
    'sql', 'toml', 'diff', 'markdown', 'docker', 'ini',
  ];
  PRISM_LANGS.forEach(function (lang) {
    app.get('/vendor/prism-components/prism-' + lang + '.min.js', function (req, res) {
      res.sendFile(path.join(path.dirname(require.resolve('prismjs/package.json')), 'components', 'prism-' + lang + '.min.js'));
    });
  });

  app.use(express.static(path.join(__dirname, '..', 'renderer')));

  let clients = [];
  function broadcast(event) {
    const payload = 'data: ' + JSON.stringify(event) + '\n\n';
    clients = clients.filter(function (res) {
      try { res.write(payload); return true; } catch (e) { return false; }
    });
  }

  app.get('/api/config', function (req, res) {
    const root = getRoot();
    const cfg = MG.loadConfig(root);
    res.json({
      harnessRoot: root || null,
      valid: !!cfg,
      version: cfg && cfg.version,
      topics: (cfg && cfg.topics) || [],
    });
  });

  app.post('/api/config', function (req, res) {
    if (!allowRemoteConfig) {
      return res.status(403).json({ error: 'change the harness folder from the app UI (Change folder)' });
    }
    const root = req.body && req.body.harnessRoot;
    if (!root) return res.status(400).json({ error: 'harnessRoot required' });
    setRoot(root);
    broadcast({ type: 'config-changed' });
    res.json({ harnessRoot: root });
  });

  app.get('/api/graph', function (req, res) {
    const root = getRoot();
    if (!root) return res.json({ nodes: [], edges: [] });
    const all = MG.listTopics(root).map(function (t) { return t.id; });
    const wanted = req.query.topic ? [String(req.query.topic)] : all;
    const built = MG.buildGraphForTopics(root, wanted);
    res.json({ nodes: built.nodes, edges: built.edges });
  });

  app.get('/api/record', function (req, res) {
    const root = getRoot();
    const id = req.query.id;
    if (!root || !id) return res.status(404).json({ error: 'not found' });
    const topics = MG.listTopics(root).map(function (t) { return t.id; });
    const built = MG.buildGraphForTopics(root, topics);
    const finding = built.recordsById.get(String(id));
    if (!finding) return res.status(404).json({ error: 'not found' });
    const nodesById = new Map(built.nodes.map(function (n) { return [n.id, n]; }));
    res.json(MG.toMIFRecord(finding, nodesById));
  });

  app.get('/api/reports', function (req, res) {
    const root = getRoot();
    if (!root) return res.json([]);
    const topics = MG.listTopics(root).map(function (t) { return t.id; });
    res.json(MG.listReports(root, topics));
  });

  app.get('/api/reports/:topic/:slug', function (req, res) {
    const root = getRoot();
    if (!root) return res.status(404).json({ error: 'no harness configured' });
    const report = MG.readReport(root, req.params.topic, req.params.slug);
    if (!report) return res.status(404).json({ error: 'not found' });
    res.json(report);
  });

  app.get('/api/search', function (req, res) {
    const root = getRoot();
    const q = req.query.q ? String(req.query.q) : '';
    if (!root) return res.json([]);
    const topics = MG.listTopics(root).map(function (t) { return t.id; });
    res.json(MG.search(root, topics, q));
  });

  app.get('/api/events', function (req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
    res.write('\n');
    clients.push(res);
    req.on('close', function () {
      clients = clients.filter(function (c) { return c !== res; });
    });
  });

  let watcher = null;
  function watch(root) {
    if (watcher) { watcher.close(); watcher = null; }
    if (!root) return;
    // disableGlobbing: the root is a literal directory path (from the native
    // folder dialog, argv/env, or POST /api/config in standalone server mode),
    // never a glob. Without it chokidar 3 runs any '{' in the path through
    // braces.expand(), which is the stack-exhaustion sink of GHSA-vfj7-8cjw-p6xm
    // (no fixed braces release) — and would also mis-watch a folder whose name
    // legitimately contains glob characters.
    watcher = chokidar.watch(path.join(root, 'reports'), { ignoreInitial: true, depth: 8, disableGlobbing: true });
    const notify = function () { broadcast({ type: 'changed', at: Date.now() }); };
    watcher.on('add', notify).on('change', notify).on('unlink', notify).on('addDir', notify);
  }

  return { app: app, watch: watch, broadcast: broadcast };
}

module.exports = { createApp: createApp };
