const { io } = require("../index");

io.on("connection", (client) => {
  console.log("client connected");

  client.on("disconnect", () => {
    console.log("client disconnected");
  });

  client.on("message", (payload) => {
    console.log(payload);
    io.emit("message", { admin: "New message" });
  });
});
