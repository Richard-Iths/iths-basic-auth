const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
require("dotenv").config();
require("./db/mongoose");

const routes = require("./routes/routes");

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
