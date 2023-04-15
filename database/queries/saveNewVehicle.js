const sqlite3 = require("sqlite3").verbose();

async function saveNewVehicle(data) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database("./database.db", (err) => {
      if (err) {
        reject(err);
      }
    });

    db.run(
      `INSERT INTO vehicles (registration, sideNumber) VALUES (?, ?);`,
      [data.registration, data.sideNumber],
      function (err) {
        if (err) throw err;
        const equipment_id = this.lastID;
        const vehicle_equipment_list = data.equipmentList;
        db.serialize(() => {
          for (item of vehicle_equipment_list) {
            db.run(
              `INSERT INTO vehicle_equipment_lists (equipment_id, equipment_item) VALUES (?, ?);`,
              [equipment_id, item],
              function (err) {
                if (err) throw err;
              }
            );
          }
        });
      }
    );
    resolve("Vehicle added");
  });
}

module.exports = { saveNewVehicle };
