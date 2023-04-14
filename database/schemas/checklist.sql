CREATE TABLE IF NOT EXISTS checklist (
        id INTEGER PRIMARY KEY,
        equipment_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT (datetime('now','localtime')),
        FOREIGN KEY (equipment_id) REFERENCES vehicles (id)
        );