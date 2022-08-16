const express = require("express");
const path = require("path");
require("dotenv").config();

// APP de Express
const app = express();

// Node Server
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require("./sockets/socket");

// Sockets messages

//Public path
const publiPath = path.resolve(__dirname, "public");

app.use(express.static(publiPath));

server.listen(process.env.PORT, (err) => {
  if (err) throw new Error(err);

  console.log(`Servidor corriendo en puerto`, process.env.PORT);
});
