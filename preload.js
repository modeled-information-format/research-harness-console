// preload.js -- the only bridge between the renderer and Node/Electron APIs,
// exposed with contextIsolation on so the renderer never gets raw Node access.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('harnessConsole', {
  isElectron: true,
  chooseFolder: function () { return ipcRenderer.invoke('choose-folder'); },
  getRoot: function () { return ipcRenderer.invoke('get-root'); },
});
