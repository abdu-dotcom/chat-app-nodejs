import express from "express";

// controller
import { getUsers } from "./controller/users.js";

const app = express();
const port = 5000;

app.use('/', getUsers);

export { app, port };