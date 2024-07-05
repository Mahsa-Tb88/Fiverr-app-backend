import express from "express";
import {
  createReview,
  deleteReviews,
  getReviews,
} from "../controllers/reviewController.js";
import { verifyToken } from "../middleWares/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createReview);
router.get("/:gigId", verifyToken, getReviews);
router.delete("/:id", verifyToken, deleteReviews);

export default router;
