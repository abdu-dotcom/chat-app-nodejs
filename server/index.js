// import { Server } from "socket.io";
// import http dan socket.io 
import http from "http";
import { Server } from 'socket.io';
// import file 
import { app, port } from "./app.js";
import db from "./config/Db.js";

const users = [];
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000/chat-app", "http://localhost:3000"],
        methods: ["GET", "POST"]
    }
});

// test connection database
try {
    await db.authenticate();
    console.log("Database berhasil terhubung");
} catch (error) {
    console.log(error);
}

// menghubungi socket.io
io.on("connection", (socket) => {
    //  ...
    console.log(`New WS connection: ` + socket.id);

    // attach incoming listener for new user
    socket.on("user_connected", (username) => {
        // save in array 
        users[username] = socket.id;

        // save name in global variable
        // listen from the server 
        io.emit("user_connected", username);
    });

    // listen from client 
    socket.on("send_message", (data) => {
        var socketId = users[data.receiverUsername];

        socket.to(socketId).emit("receive_message", data);
    })
    socket.on("disconnect", () => {
        console.log(`user ${socket.id} disconnected`);
    });
});

httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
});