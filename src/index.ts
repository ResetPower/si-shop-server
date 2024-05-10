import express from "express";

console.log("Hello, World!");

const app = express();

app.get("/", (req, res) => {
  res.send(JSON.stringify({ textMessage: "Hello, World!" }));
});

app.listen(250);
