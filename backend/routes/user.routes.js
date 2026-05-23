import { signUp, login, getUserVideos, getUserProfile } from "../controllers/user.controllers.js";
import { Router } from "express";
import { authenticateToken } from "../middlewares.js";

const router=Router();

router.post("/signup",signUp);
router.post("/login",login);
router.get("/videos", authenticateToken, getUserVideos);
router.get("/profile", authenticateToken, getUserProfile);

export default router;