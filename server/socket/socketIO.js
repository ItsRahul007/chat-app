const DeleteMSG = require("../schema/DeleteMSG");
const collectedMSG = require("../schema/UnsendMSG");
const UpdateMSG = require("../schema/UpdateMSG");

const users = {}; // For storing users with the key of socket id and the value of their mondoDB id 

// Finding the object key with his value
function getKeyByValue(value) {
  return Object.keys(users).find(key => users[key] === value);
};

function socketServer(io) {
  io.on("connection", socket => {

    // when a new user online throwing a function named "user-join"
    socket.on("user-online", async (userId) => {
      users[socket.id] = userId;
      socket.broadcast.emit("new-user-online", userId);
      socket.join(userId); // Join the users on their specified rooms with the name of their id's

      // Checking if user has some pending messages and pending deleted or updated messages or not
      const messages = await collectedMSG.find({ reciverId: userId });
      const deleteMessages = await DeleteMSG.find({ reciverId: userId });
      const updateMessages = await UpdateMSG.find({ reciverId: userId });

      // If user have any messages
      if (!messages.length <= 0) {
        socket.emit("get-unsend-msg", messages);
      };

      // If user have some message to be deleted
      if(deleteMessages) socket.emit("delete-msg-db", deleteMessages);
      // If user have some message to be updated
      if(updateMessages) socket.emit("update-msg-db", updateMessages);
    });

    // Getting the id of already connected user
    socket.emit("get-online-id", Object.values(users));

    // When send msg emittied, emiting recive msg function
    socket.on("send_msg", async ({ text, id, msgId }) => {
      // Checking if the user online or not
      let objectKey = getKeyByValue(id);
      if (objectKey) {
        io.to(id).emit("recive-msg", { id: users[socket.id], msg: text, msgId });
      }
      else { // If user is offline the saving the messages on database
        try {
          const newMSG = new collectedMSG({
            senderId: users[socket.id],
            reciverId: id,
            message: text,
            msgId
          });
          await newMSG.save();
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

    // If user recived updated messages then deleting the messages from DB
    socket.on("recived-update-msg", async (msgId) => {
      await UpdateMSG.findByIdAndDelete(msgId);
    });

    // If user recived deleted messages then deleting the messages from DB
    socket.on("recived-deleted-msg", async (msgId) => {
      await DeleteMSG.findByIdAndDelete(msgId);
    });

    // Getting the updates and broadcast it to the other users
    socket.on("user-update-client", () => {
      socket.broadcast.emit("user-update-server");
    });

    // When someone update message
    socket.on("update-msg", async (obj) => {
      // Checking if the user online or not
      let objectKey = getKeyByValue(obj.reciverId);
      if(objectKey){
        io.to(obj.reciverId).emit("update-msg-server", obj);
      }
      else{
        const {senderId, reciverId, msgId, newContent} = obj;
        const newUpdate = new UpdateMSG({
          senderId, 
          reciverId, 
          msgId, 
          newContent
        });

        await newUpdate.save();
      };
    });

    // When someone delete message
    socket.on("delete-msg", async (obj) => {
      // Checking if the user online or not
      let objectKey = getKeyByValue(obj.reciverId);
      if(objectKey){
        io.to(obj.reciverId).emit("delete-msg-server", obj);
      }
      else{
        const {senderId, reciverId, msgId} = obj;
        const newDelete = new DeleteMSG({
          senderId,
          reciverId,
          msgId
        });

        await newDelete.save();
      };
    });

    // When user disconnect 
    socket.on("disconnect", () => {
      socket.broadcast.emit("user-offline", users[socket.id]);
      delete users[socket.id];
    });
  });
};

module.exports = socketServer;
