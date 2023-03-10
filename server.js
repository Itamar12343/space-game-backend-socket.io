const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const cors = require("cors");
const port = process.env.Port || 3001;
const router = express.Router();
app.use(router, cors());

/*router.get("/", (req, res) => {
    res.json({
        "h": "hgf"
    });
});*/

const io = new Server(server, {
    cors: {
        //origin: "http://localhost:3000",
        origin: ["https://space-game123.netlify.app", "http://localhost:3000"]
            //origin: "*"
    }
});

io.on("connection", socket => {

    socket.on("stream", data => {
        socket.broadcast.emit("stream", data);
        console.log(data + "heyhh");
    });

    socket.on("join_room", room => {
        socket.join(room);
        let numberOfUsers = io.sockets.adapter.rooms.get(room).size;
        if (numberOfUsers >= 3) {
            socket.leave(room);
            socket.emit("reject_room", "the room is full");

        } else if (numberOfUsers === 2) {
            socket.emit("aprove_room", "success");
            socket.to(room).emit("aprove_room", "success");

        } else if (numberOfUsers === 1) {
            socket.emit("waiting_room", "wait");
        }
        //console.log(numberOfUsers);
    });

    socket.on("leave_room", room => {
        socket.leave(room);
    });

    socket.on("space_sheep_position", data => {
        socket.to(data.room).emit("space_sheep_position", data.position);
        //console.log(data.position);
    });

    socket.on("shoot", room => {
        socket.to(room).emit("shoot");
    });

    socket.on("I got hit", room => {
        socket.to(room).emit("he got hit");
    });

    socket.on("I lost", room => {
        socket.to(room).emit("you won");
    });

});

server.listen(port, () => {
    //console.log("success");
});