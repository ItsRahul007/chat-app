const express = require("express");
const connectMongo = require("./connectDB");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const port = 4000;
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

connectMongo();
app.use(express.json());
app.use(cors());

//Avalible routes
app.use("/auth", require("./routes/users"));
app.use("/socket", require("./socket/socketIO"));

server.listen(port, () => {
    console.log(`app listen on http://localhost:${port}`);
});

module.exports = io;