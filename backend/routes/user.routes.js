import { signUp, login, googleAuth, getUserVideos, getUserProfile } from "../controllers/user.controllers.js";
import { Router } from "express";
import { authenticateToken } from "../middlewares.js";

const router=Router();

router.post("/signup",signUp);
router.post("/login",login);
router.post("/google",googleAuth);
router.get("/videos", authenticateToken, getUserVideos);
router.get("/profile", authenticateToken, getUserProfile);

export default router;