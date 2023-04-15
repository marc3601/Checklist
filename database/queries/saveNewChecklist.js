const sqlite3 = require("sqlite3").verbose();

async function saveNewChecklist(data) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database("./database.db", (err) => {
      if (err) {
        reject(err);
      }
    });

    db.run(
      `INSERT INTO checklist (equipment_id) VALUES (?);`,
      [data.id],
      function (err) {
        if (err) throw err;
        const checklistID = this.lastID;
        const completedChecklist = data.completedChecklist;
        db.serialize(() => {
          for (item of completedChecklist) {
            const isPresent = item.isPresent ? 1 : 0;
            db.run(
              `INSERT INTO checked_items (checklist_id, item, is_present) VALUES (?, ?, ?);`,
              [checklistID, item.equipment_item, isPresent],
              function (err) {
                if (err) throw err;
                resolve("Checklista zapisana.");
              }
            );
          }
        });
      }
    );
  });
}

module.exports = { saveNewChecklist };
