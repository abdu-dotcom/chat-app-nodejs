import express from "express";
import messageRouter from "./router/message.js";

// controller

import userRouter from "./router/users.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(userRouter);
app.use(messageRouter);

export { app, port };