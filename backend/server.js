import colors from "colors";
import dotenv from "dotenv";
import express from "express";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
colors;

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const port = process.env.PORT || 7070;

const app = express();

app.use(express.json());

// check if the server is working.
app.get("/", (req, res) => {
  res.send("api is running just fine");
});

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, console.log(`Server started on port: ${port}`.yellow.bold));
