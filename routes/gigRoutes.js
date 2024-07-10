import express from "express";
import { verifyToken } from "../middleWares/jwt.js";
import {
  createGig,
  deleteGig,
  getGig,
  getGigs,
  getGigsUser,
} from "../controllers/gigController.js";

const router = express.Router();

router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);
router.get("/single/:id", getGig);
router.get("/:id", verifyToken, getGigsUser);
router.get("/", getGigs);

export default router;
