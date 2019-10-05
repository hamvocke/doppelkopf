--- toggles

DROP TABLE IF EXISTS toggles;
CREATE TABLE toggles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  state BOOLEAN NOT NULL
);

INSERT INTO toggles (id, name, state) VALUES (1, "some flag", true);


--- event types

DROP TABLE IF EXISTS event_types;
CREATE TABLE event_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

INSERT INTO event_types (id, name) VALUES (1, "game.start");
INSERT INTO event_types (id, name) VALUES (2, "game.finish");
INSERT INTO event_types (id, name) VALUES (3, "game.win");
INSERT INTO event_types (id, name) VALUES (4, "game.lose");

--- events

DROP TABLE IF EXISTS events;
CREATE TABLE events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_type INTEGER,
  created_at INTEGER,
  FOREIGN KEY(event_type) REFERENCES event_types(id)
);

