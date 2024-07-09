import express from "express";
import { verifyToken } from "../middleWares/jwt.js";
import { getOrders, intent,confirm } from "../controllers/orderController.js";

const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.put("/", verifyToken, confirm);

export default router;
