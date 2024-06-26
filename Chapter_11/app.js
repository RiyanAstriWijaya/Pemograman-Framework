const { name } = require("ejs");
const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { name: "riyan" });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
