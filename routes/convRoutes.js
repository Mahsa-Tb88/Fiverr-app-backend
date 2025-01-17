import express from "express";
import { verifyToken } from "../middleWares/jwt.js";
import {
  createConversation,
  getSingleConversation,
  getConversations,
  updateConversation,
} from "../controllers/convController.js";

const router = express.Router();

router.get("/", verifyToken, getConversations);
router.post("/", verifyToken, createConversation);
router.get("/single/:id", verifyToken, getSingleConversation);
router.put("/:id", verifyToken, updateConversation);

export default router;
