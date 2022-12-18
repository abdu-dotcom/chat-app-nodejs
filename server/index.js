// import { Server } from "socket.io";
import http from "http";
import { app, port } from "./app.js";
import db from "./config/Db.js";

const server = http.createServer(app);

try {
    await db.authenticate();
    console.log("Database berhasil terhubung");
} catch (error) {
    console.log(error);
}

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});