import colors from "colors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { Server } from "socket.io";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
colors;

import connectDB from "./config/db.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const port = process.env.PORT || 7070;

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

/* --------------Deployment-------------- */

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

/* --------------Deployment-------------- */

app.use(notFound);
app.use(errorHandler);

const server = app.listen(
  port,
  console.log(`Server started on port: ${port}`.yellow.bold)
);

// socket.io
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("joinChat", (room) => {
    socket.join(room);
    console.log("User joined room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stopTyping", (room) => socket.in(room).emit("stopTyping"));

  socket.on("newMessage", (newMessage) => {
    const chat = newMessage.chat;
    if (!chat.users) return console.log("chat users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessage.sender._id) return;
      socket.in(user._id).emit("messageRecieved", newMessage);
    });
  });

  socket.off("setup", (userData) => {
    console.log("user disconnected");
    socket.leave(userData._id);
  });
});
