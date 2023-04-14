const sqlite3 = require("sqlite3").verbose();

getVehicleChecklist = (vehicle) => {
  return new Promise((resolve, reject) => {
    // Get specified vehicle list of equipment
    const db = new sqlite3.Database("./database.db", (err) => {
      if (err) {
        reject(err);
      }
    });
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

module.exports = { getVehicleChecklist };
