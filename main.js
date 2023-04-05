const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("file.db");

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

  ipcMain.on("request-tankers", (e) => {
    db.all("SELECT * FROM Tankers", (err, rows) => {
      if (err) throw err;
      e.reply("send-tankers", rows);
    });
  });
});

//app ID for Windows notifications
app.setAppUserModelId("Checklista");

app.on("window-all-closed", () => {
  app.quit();
});

//database insert
db.serialize(() => {
  // db.run("CREATE TABLE IF NOT EXISTS Tankers (Number, licensePlate)");
  // db.run("INSERT INTO Tankers VALUES (?, ?)", ["45", "CIN AJ29"]);
});
