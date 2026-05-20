import express from "express";

import {
  processVideoController,
  askQuestionController,
  videoDeleteController,
} from "../controllers/youtube.controllers.js";
import { authenticateToken } from "../middlewares.js";

const router = express.Router();

router.post("/video-url",authenticateToken,processVideoController);

router.post("/ask/:videoId",authenticateToken,askQuestionController);

router.delete("/delete/:videoId",authenticateToken,videoDeleteController)

export default router;