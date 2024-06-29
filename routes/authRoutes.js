import express from "express";
import { login, registerUser, signOut } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/logOut", signOut);

export default router;
