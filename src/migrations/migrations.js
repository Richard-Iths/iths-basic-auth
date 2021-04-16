const connection = require("../db/sqlite");

connection.serialize(() => {
  connection.get("PRAGMA foreign_keys = ON");
  connection.run(
    `CREATE TABLE IF NOT EXISTS users
    (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    password TEXT NOT NULL
    )`,
    function (err) {
      if (err) throw new Error(err);
      console.log("Users created");
    }
  );
  connection.run(
    `CREATE TABLE IF NOT EXISTS users_profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    favoritePet TEXT,
    user_id INTEGER,
    FOREIGN KEY('user_id') REFERENCES users('id')
  )`,
    function (err) {
      if (err) throw new Error(err);
      console.log("User_profile table created");
    }
  );
});
