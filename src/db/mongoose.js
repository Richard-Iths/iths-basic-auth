const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/auth-test", { useUnifiedTopology: true })
  .then(() => console.log("db is running"));
