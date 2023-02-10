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
        //origin: "https://space-game123.netlify.app/"
        origin: "*"
    }
});

io.on("connection", socket => {

    socket.on("stream", data => {
        socket.broadcast.emit("stream", data);
        console.log(data + "heyhh");
    });

    socket.on("join_room", data => {
        socket.join(data);
    });

    socket.on("space_sheep_position", data => {
        socket.to(data.room).emit("space_sheep_position", data.leftPosition);
        console.log(data.leftPosition);
    });

});

server.listen(port, () => {
    //console.log("success");
});