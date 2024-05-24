const express = require("express");
const router = require("./routes");
const index = express();

index.use(express.json());

index.use("/", router);

index.listen(3000, () => {
  console.log("Server Runing On Port 3000");
});
