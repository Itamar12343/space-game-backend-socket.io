const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const cors = require("cors");
const port = process.env.Port || 3001;
app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", socket => {

    socket.on("stream", data => {
        socket.broadcast.emit("stream", data);
        console.log(data);
    });


});

server.listen(port, () => {
    //console.log("success");
});