const io = require('socket.io')(8080, {
  cors: {
    origin: '*',
  }
});
const users = {};

const socket = () => {

  io.on("connection", socket => {
    // when a new user join throwing a function named "user-join"
    socket.on("new-user-join", name => {
      users[socket.id] = name;
      socket.broadcast.emit("user-join", name);
    });

    socket.on("send-msg", message => {
      socket.broadcast.emit("recive-msg", { name: users[socket.id], message: message });
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("user-offline", users[socket.id]);
    });
  });
};

module.exports = socket;
