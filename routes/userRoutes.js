import express from "express";
import { deleteUser } from "../controllers/userController.js";
import { isLoggedIn } from "../middleWares/authMiddleWare.js";

const router = express.Router();

router.delete("/:id", isLoggedIn, deleteUser);

export default router;
