const express = require("express");
const connectMongo = require("./connectDB");
const cors = require("cors");

const app = express();
const port = 4000;
connectMongo();
app.use(express.json());
app.use(cors())

function expressData(){
    //Avalible routes
    app.use("/auth", require("./routes/users"));
    
    app.listen(port, () => {
        console.log(`app listen on http://localhost:${port}`);
    });
}

module.exports = expressData;
