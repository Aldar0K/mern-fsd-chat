import dotenv from "dotenv";
import express from "express";

import { chats } from "./data/data.js";

dotenv.config();
const port = process.env.PORT || 7070;

const app = express();

// check if the server is working.
app.get("/", (req, res) => {
  res.send("api is running just fine");
});

// get all chats.
app.get("/api/chat", (req, res) => {
  res.send(chats);
});

// get a single chat.
app.get("/api/chat/:id", (req, res) => {
  const requestedChatId = req.params.id;

  const chat = chats.find((chat) => chat.id === requestedChatId);
  res.send(chat);
});

app.listen(port, console.log(`Server started on port: ${port}`));
