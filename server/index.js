const express = require("express");
const connectMongo = require("./connectDB");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const socketServer = require("./socket/socketIO");
const port = 4000;
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

// Runing socket and sending the io server as prop
socketServer(io)

connectMongo();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

//Avalible routes
app.use("/auth", require("./routes/users"));
app.use("/upload", require("./routes/uploadImage"));
app.use("/socket", require("./socket/socketIO"));
app.use("/github", require("./github/githubAuth"));

server.listen(port, () => {
    console.log(`app listen on http://localhost:${port}`);
});