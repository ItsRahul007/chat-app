const io = require("../index.js");

const users = {};
// function socketServer(){
  io.on("connection", socket => {
    console.log(socket.id);
    // when a new user join throwing a function named "user-join"
    socket.on("user-online", id => {
      users[socket.id] = id;
      // socket.broadcast.emit("new-user-online", id);
    });
  
    socket.on("send-msg", message => {
      console.log(message);
      socket.broadcast.emit("recive-msg", { id: users[socket.id], msg: message });
    });
  
    socket.on("disconnect", () => {
      socket.broadcast.emit("user-offline", users[socket.id]);
    });
  });
// };

// module.exports = socketServer;
