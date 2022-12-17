import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// controller
import messageRouter from "./router/message.js";
import userRouter from "./router/users.js";

const app = express();
const port = 5000;

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(userRouter);
app.use(messageRouter);

export { app, port };