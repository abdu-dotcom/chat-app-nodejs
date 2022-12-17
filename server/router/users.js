import express from "express";
import { createUser, getAllUsers, getAUser, loginUser } from "../controller/users.js";

const users = express.Router();

users.post('/api/user/login', loginUser);

users.post('/api/user', createUser);
users.get('/api/users', getAllUsers);
users.get('/api/users/:id_penerima', getAUser);

export default users;