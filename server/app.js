import express from "express";
const app = express();
const port = 5000;

app.use('/', (req, res) => {
    res.send("Hello world");
});

export { app, port };