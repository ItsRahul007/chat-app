const users = {}; // For storing users with the key of socket id and the value of their mondoDB id 
// const msgArr = []; // For storing the users messages with their mongoDb id
const allChat = {}; // For creating the chats name and storing the users messages with their mongoDb id
function socketServer(io) {
  io.on("connection", socket => {
    // when a new user online throwing a function named "user-join"
    socket.on("user-online", id => {
      users[socket.id] = id;
      socket.broadcast.emit("new-user-online", id);
    });
    // key onujai message gulo store kora ta kor
    socket.on("send_msg", ({ text, id }) => {
      socket.to(id).emit("recive-msg", { id: users[socket.id], msg: text });

      // Checking if the users already chatted or not. If not then creating an index with their id's and if they already chatted then updating the chat index
      if (allChat.hasOwnProperty(users[socket.id] + "_" + id)) {
        allChat[users[socket.id] + "_" + id].push({ id: users[socket.id], msg: text });
      }
      else if (allChat.hasOwnProperty(id + "_" + users[socket.id])) {
        allChat[id + "_" + users[socket.id]].push({ id: users[socket.id], msg: text });
      }
      else {
        allChat[users[socket.id] + "_" + id] = [{ id: users[socket.id], msg: text }];
      }
      console.log(allChat);
    });

    socket.on("disconnect", () => {
      console.log("user offline " + users[socket.id]);
      socket.broadcast.emit("user-offline", users[socket.id]);
    });
  });
};

module.exports = socketServer;
