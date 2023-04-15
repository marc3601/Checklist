const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { createDatabase } = require("./database/database");
const { requestTankers } = require("./handlers/requestTankers");
const { requestChecklist } = require("./handlers/requestChecklist");
const {
  addNewVehicleAndEquipment,
} = require("./handlers/addNewVehicleAndEquipment");
const { addNewChecklist } = require("./handlers/addNewChecklist");
const { testDbQueries } = require("./test/database.test");

const createWindow = () => {
  const window = new BrowserWindow({
    title: "Checklist",
    width: 768, //768
    height: 1366, //1366
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  window.loadFile("./renderer/index.html");
};

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  ipcMain.on("request-tankers", requestTankers);

  ipcMain.on("request-checklist", requestChecklist);

  ipcMain.on("save-equipment", addNewVehicleAndEquipment);
  ipcMain.on("save-checklist", addNewChecklist);
});

//app ID for Windows notifications
app.setAppUserModelId("Checklista");

// test db queries
// testDbQueries();

app.on("window-all-closed", () => {
  app.quit();
});

// Database create
createDatabase().then((res) => console.log(res));
