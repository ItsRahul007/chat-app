const users = {}; // For storing users with the key of socket id and the value of their mondoDB id 
const msgArr = []; // For storing the users messages with their mongoDb id
function socketServer(io){
  io.on("connection", socket => {
    // when a new user online throwing a function named "user-join"
    socket.on("user-online", id => {
      users[socket.id] = id;
      socket.broadcast.emit("new-user-online", id);
    });
  
    socket.on("send_msg", msg => {
      socket.broadcast.emit("recive-msg", { id: users[socket.id], msg });
      msgArr.push({ id: users[socket.id], msg });
      console.log(msgArr);
    });
  
    socket.on("disconnect", () => {
      console.log("user offline "+users[socket.id]);
      socket.broadcast.emit("user-offline", users[socket.id]);
    });
  });
};

module.exports = socketServer;
