const sqlite3 = require("sqlite3").verbose();

async function getAllVehicles() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database("./database.db", (err) => {
      if (err) {
        reject(err);
      }
    });

    db.all("SELECT * FROM vehicles", async (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }

      db.close();
    });
  });
}

module.exports = { getAllVehicles };
