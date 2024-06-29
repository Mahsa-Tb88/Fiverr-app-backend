import express from "express";
import { initialize } from "../controllers/miscController.js";

const router = express.Router();

router.get("/misc/initialize", initialize);

export default router;
