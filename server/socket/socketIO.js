const collectedMSG = require("../schema/UnsendMSG");

const users = {}; // For storing users with the key of socket id and the value of their mondoDB id 

// Finding the object key with his value
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function socketServer(io) {
  io.on("connection", socket => {

    // when a new user online throwing a function named "user-join"
    socket.on("user-online", async (userId) => {
      users[socket.id] = userId;
      socket.broadcast.emit("new-user-online", userId);
      socket.join(userId); // Join the users on their specified rooms with the name of their id's

      // Checking if user has some pending messages or not
      const messages = await collectedMSG.find({ reciverId: userId });
      // If user have any messages
      if (!messages.length <= 0) {
        socket.emit("get-unsend-msg", messages);
      };
    });

    // Getting the id of already connected user
    socket.emit("get-online-id", Object.values(users));

    // When send msg emittied, emiting recive msg function
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
          console.log('Message saved for offline user:', newMSG);
        }
        catch (error) {
          console.error('Error saving message:', error);
        };
      };
    });

    // If user recived unsend messages then deleting the messages from DB
    socket.on("recived-unsend-msg", async (msgId) => {
      await collectedMSG.findByIdAndDelete(msgId);
    });

    socket.on("disconnect", () => {
      console.log("user offline " + users[socket.id]);
      socket.broadcast.emit("user-offline", users[socket.id]);
      delete users[socket.id];
    });
  });
};

module.exports = socketServer;
