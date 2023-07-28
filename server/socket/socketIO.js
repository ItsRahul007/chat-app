const collectedMSG = require("../schema/UnsendMSG");

const users = {}; // For storing users with the key of socket id and the value of their mondoDB id 
const allChat = {}; // For creating the chats name and storing the users messages with their mongoDb id

// Finding the object key with his value
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function socketServer(io) {
  io.on("connection", socket => {
    // when a new user online throwing a function named "user-join"
    socket.on("user-online", userId => {
      users[socket.id] = userId;
      socket.broadcast.emit("new-user-online", userId);
      socket.join(userId); // Join the users on their specified rooms with the name of their id's
    });

    // When send msg emittied emiting recive msg function
    socket.on("send_msg", async ({ text, id }) => {
      // Checking if the user online or not
      let objectKey = getKeyByValue(users, id);
      if (objectKey) {
        io.to(id).emit("recive-msg", { id: users[socket.id], msg: text });
      }
      else { // If user is offline the saving the messages on database
        try {
          const newMSG = new collectedMSG({
            senderId: users[socket.id],
            reciverId: id,
            message: text
          });
          await newMSG.save();
          console.log('Message saved for offline user:', newMessage);
        }
        catch (error) {
          console.error('Error saving message:', error);
        };
      };

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
      delete users[socket.id];
    });
  });
};

module.exports = socketServer;
