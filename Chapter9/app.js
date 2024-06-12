require("dotenv").config();
const express = require("express");
const app = express();
const { PORT } = process.env;
const routes = require("./routes");

app.use(express.json());

app.use("/", routes);

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
