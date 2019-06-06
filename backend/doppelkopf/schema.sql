DROP TABLE IF EXISTS toggle;

CREATE TABLE toggle (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  state BOOLEAN NOT NULL
);


INSERT INTO toggle (id, name, state) VALUES (1, "some flag", true);
