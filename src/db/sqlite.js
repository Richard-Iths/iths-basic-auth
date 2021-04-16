const { Database } = require("sqlite3");
const path = require("path");

const connection = new Database(path.join(__dirname, "test-auth.db"));

module.exports = connection;
