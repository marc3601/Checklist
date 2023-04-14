const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");
const vehiclesSchema = fs
  .readFileSync(path.resolve(__dirname, "schemas/vehicles.sql"))
  .toString();
const vehiclesEquipmentListsSchema = fs
  .readFileSync(path.resolve(__dirname, "schemas/vehicle_equipment_lists.sql"))
  .toString();
const checklist = fs
  .readFileSync(path.resolve(__dirname, "schemas/checklist.sql"))
  .toString();
const checkedItems = fs
  .readFileSync(path.resolve(__dirname, "schemas/checked_items.sql"))
  .toString();

// Database create

async function createDatabase() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database("database.db", (err) => {
      if (err) {
        reject(err);
      }
    });
    db.serialize(() => {
      db.run(vehiclesSchema, (err) => {
        if (err) throw err;
      });

      db.run(vehiclesEquipmentListsSchema, (err) => {
        if (err) throw err;
      });
      db.run(checklist, (err) => {
        if (err) throw err;
      });
      db.run(checkedItems, (err) => {
        if (err) throw err;
      });
      db.close();
      resolve("Database ok");
    });
  });
}

module.exports = { createDatabase };
