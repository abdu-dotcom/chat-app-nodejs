import express from "express";
import { sendMessage } from "../controller/message.js";

const message = express.Router();

message.post('/api/send/message', sendMessage);
// users.get('/api/users', getAllUsers);

export default message;