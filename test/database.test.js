const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("database.db");

const testDbQueries = () => {
  db.all(`SELECT * FROM checklist`, (err, rows) => {
    if (err) throw err;
    console.log(rows);
  });
};

module.exports = { testDbQueries };
