import express from "express";
import { verifyToken } from "../middleWares/jwt.js";
import { createOrder, getOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);

export default router;
