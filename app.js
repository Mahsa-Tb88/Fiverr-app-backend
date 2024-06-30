console.clear();
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import convRoutes from "./routes/convRoutes.js";
import gigRoutes from "./routes/gigRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import corsMiddleware from "./middleWares/corsMiddleWare.js";
dotenv.config();

const app = express();
// app.use(cors({ origin: "http://localhost:5173", credential: true }));
app.use(express.json());
app.use(cookieParser());
app.use(corsMiddleware);

app.use("/auth", authRoutes);
app.use("/api/conv", convRoutes);
app.use("/api/gig", gigRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/user", userRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "shomething went wrong";

  return res.status(errorStatus).send(errorMessage);
});

try {
  await mongoose.connect(process.env.MONGO);
  console.log("Connected to the database");
  app.listen(3000, () => {
    console.log("Server is running on http://localhost3000");
  });
} catch (e) {
  console.log(e.message);
}
