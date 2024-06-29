console.clear();
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import convRoutes from "./routes/convRoutes.js";
import gigRoutes from "./routes/gigRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import corsMiddleware from "./middleWares/corsMiddleWares.js";
import responseMiddleWare from "./middleWares/responseMiddleWare.js";
import miscRoutes from "./routes/miscRoutes.js";
import { checkToken } from "./middleWares/authMiddleWare.js";

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());
app.use(corsMiddleware);
app.use(responseMiddleWare);
app.use(cookieParser());
app.use(checkToken);
app.use(miscRoutes);

app.use("/", express.static(path.join(__dirname, "dist")));

app.use("/auth", authRoutes);
app.use("/api/conv", convRoutes);
app.use("/api/gig", gigRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/user", userRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
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
