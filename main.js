// main.js -- Electron main process.
//
// Starts the same HTTP bridge server/start.js runs standalone, on an
// OS-assigned localhost port, then opens a BrowserWindow pointed at it. The
// harness folder is chosen via the native folder dialog (not a remote
// /api/config POST -- see server/bridge.js's allowRemoteConfig:false below)
// and persisted to Electron's userData dir so it's remembered next launch.

const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const http = require('http');
const { createApp } = require('./server/bridge');

const CONFIG_PATH = path.join(app.getPath('userData'), 'config.json');

function loadStoredRoot() {
  try { return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8')).harnessRoot || null; }
  catch (e) { return null; }
}
function storeRoot(root) {
  try { fs.writeFileSync(CONFIG_PATH, JSON.stringify({ harnessRoot: root }, null, 2)); }
  catch (e) { /* non-fatal */ }
}

let harnessRoot = loadStoredRoot();
let win = null;
let port = null;

const bridge = createApp({
  getRoot: function () { return harnessRoot; },
  setRoot: function () { /* no-op: Electron only changes root via the native dialog below */ },
  allowRemoteConfig: false,
});

function startServer() {
  return new Promise(function (resolve) {
    const server = http.createServer(bridge.app);
    server.listen(0, '127.0.0.1', function () {
      port = server.address().port;
      bridge.watch(harnessRoot);
      resolve(port);
    });
  });
}

async function createWindow() {
  await startServer();
  win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 960,
    minHeight: 600,
    backgroundColor: '#0a0d13',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.loadURL('http://127.0.0.1:' + port + '/');
}

ipcMain.handle('choose-folder', async function () {
  const result = await dialog.showOpenDialog(win, {
    properties: ['openDirectory'],
    title: 'Select your research-harness clone',
  });
  if (result.canceled || !result.filePaths[0]) return harnessRoot;
  harnessRoot = result.filePaths[0];
  storeRoot(harnessRoot);
  bridge.watch(harnessRoot);
  bridge.broadcast({ type: 'config-changed' });
  return harnessRoot;
});

ipcMain.handle('get-root', function () { return harnessRoot; });

app.whenReady().then(createWindow);
app.on('window-all-closed', function () { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', function () { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
