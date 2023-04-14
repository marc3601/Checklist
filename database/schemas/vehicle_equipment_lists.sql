CREATE TABLE IF NOT EXISTS vehicle_equipment_lists (
        id INTEGER PRIMARY KEY,
        equipment_id INTEGER NOT NULL,
        equipment_item TEXT NOT NULL,
        FOREIGN KEY (equipment_id) REFERENCES vehicles (id)
        );