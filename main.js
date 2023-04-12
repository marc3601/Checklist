const { rejects } = require("assert");
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("database.db");

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
    db.all("SELECT * FROM vehicles", (err, rows) => {
      if (err) throw err;
      e.reply("send-tankers", rows);
    });
  });

  ipcMain.on("request-checklist", (e, requestData) => {
    getVehicleChecklist(requestData).then((container) => {
      e.reply("send-checklist", container);
    });
  });

  ipcMain.on("save-equipment", (event, data) => {
    db.serialize(() => {
      db.run(
        `INSERT INTO vehicles (registration, sideNumber) VALUES (?, ?);`,
        [data.registration, data.sideNumber],
        function (err) {
          if (err) throw err;
          const equipment_id = this.lastID;
          const vehicle_equipment_list = data.equipmentList;
          for (item of vehicle_equipment_list) {
            db.run(
              `INSERT INTO vehicle_equipment_lists (equipment_id, equipment_item) VALUES (?, ?);`,
              [equipment_id, item],
              function (err) {
                if (err) throw console.log(err);
                console.log("vehicle_equipment_lists");
              }
            );
          }

          //TEST
          // for (item of vehicle_equipment_list) {
          //   db.run(
          //     `INSERT INTO checklists (equipment_id, equipment_item) VALUES (?, ?);`,
          //     [equipment_id, item],
          //     function (err) {
          //       if (err) throw console.log(err);
          //       console.log("checklists");
          //     }
          //   );
          // }
        }
      );
    });
  });
});

//app ID for Windows notifications
app.setAppUserModelId("Checklista");

app.on("window-all-closed", () => {
  app.quit();
});

// db.all(`SELECT * FROM checklists`, function (err, rows) {
//   console.log(rows);
// });

getVehicleChecklist = (vehicle) => {
  return new Promise((resolve, reject) => {
    // Get specified vehicle list of equipment
    const container = { vehicle: {}, equipment: [] };
    db.serialize(() => {
      db.get(
        `SELECT * FROM vehicles WHERE registration = ?`,
        [vehicle],
        function (err, row) {
          if (err) reject(err);
          container.vehicle = row;
        }
      );
      db.all(
        `SELECT equipment_item FROM vehicle_equipment_lists WHERE equipment_id = (SELECT id FROM vehicles WHERE registration = ?);`,
        [vehicle],
        function (err, rows) {
          if (err) reject(err);
          container.equipment = rows;
          resolve(container);
        }
      );
    });
  });
};

// Database create
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS vehicles (
      id INTEGER PRIMARY KEY,
      registration TEXT NOT NULL,
      sideNumber TEXT NOT NULL
    );
  `,
    (err) => {
      if (err) throw err;
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS vehicle_equipment_lists (
        id INTEGER PRIMARY KEY,
        equipment_id INTEGER NOT NULL,
        equipment_item TEXT NOT NULL,
        FOREIGN KEY (equipment_id) REFERENCES vehicles (id)
        );
        `,
    (err) => {
      if (err) throw err;
    }
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS checklists (
        id INTEGER PRIMARY KEY,
        equipment_id INTEGER NOT NULL,
        equipment_item TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT (datetime('now','localtime')),
        FOREIGN KEY (equipment_id) REFERENCES vehicles (id)
        );
        `,
    (err) => {
      if (err) throw err;
    }
  );
});
