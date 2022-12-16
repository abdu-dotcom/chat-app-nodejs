import express from "express";

// controller

import userRouter from "./router/users.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(userRouter);

export { app, port };