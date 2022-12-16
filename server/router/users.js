import express from "express";
import { createUser, getAllUsers } from "../controller/users.js";

const users = express.Router();

users.post('/api/user', createUser);
users.get('/api/users', getAllUsers);

export default users;