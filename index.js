const express = require("express");
const path = require("path");
require("dotenv").config();

//DB Config
require("./database/config").dbConnection();

// APP de Express
const app = express();

// Lectura y parseo del body
app.use(express.json());

// Node Server
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require("./sockets/socket");

// Sockets messages

//Public path
const publiPath = path.resolve(__dirname, "public");

app.use(express.static(publiPath));

//Routes
app.use("/api/auth", require("./routes/auth"));

server.listen(process.env.PORT, (err) => {
  if (err) throw new Error(err);

  console.log(`Servidor corriendo en puerto`, process.env.PORT);
});
