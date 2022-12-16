import express from "express";
import { postUser } from "../controller/users.js";

const users = express.Router();

users.post('/api/user', postUser);

export default users;