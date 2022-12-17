import { Server } from "socket.io";
import http from "http";
import { app, port } from "./app.js";
import db from "./config/Db.js";

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})

try {
    await db.authenticate();
    console.log("Database berhasil terhubung");
} catch (error) {
    console.log(error);
}

io.on("connection", (socket) => {
    console.log("User Connected: " + socket.id)

    socket.on("join_chat", data => {
        socket.join(data);
        console.log(`user ${data.room} sedang satu chat dengan ${data.namaPenerima}`)
    });

    socket.on("send_message", data => {
        // console.log(data.idPenerima);
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});