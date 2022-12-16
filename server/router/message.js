import express from "express";
import { getMessages, sendMessage } from "../controller/message.js";

const message = express.Router();

message.post('/api/send/message', sendMessage);
message.get('/api/messages', getMessages);

export default message;