CREATE TABLE IF NOT EXISTS checked_items (
        id INTEGER PRIMARY KEY,
        checklist_id INTEGER NOT NULL,
        item TEXT NOT NULL,
        is_present INTEGER NOT NULL,
        FOREIGN KEY (checklist_id) REFERENCES checklist (id)
        );