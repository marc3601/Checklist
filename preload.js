const { ipcRenderer } = require("electron");
const View = require("./classes/View");
window.ipcRenderer = ipcRenderer;
window.View = View;
