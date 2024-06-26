const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    console.log(msg);
  });
  console.log("user connected");
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
