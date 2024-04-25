// require('dotenv').config();

const express = require("express");
const app = express();
const routes = require("./routes");
const one = require("./routes/one");
const two = require("./routes/two");
const three = require("./routes/three");
const four = require("./routes/four");
const five = require("./routes/five");
const six = require("./routes/six");
const seven = require("./routes/seven");
const eight = require("./routes/eight");
const nine = require("./routes/nine");

//app.use(express.json());

app.use([routes, one, two, three, four, five, six, seven, eight, nine]);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
