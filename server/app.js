import express from "express";

// controller
import { postUser } from "./controller/users.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(postUser);

export { app, port };