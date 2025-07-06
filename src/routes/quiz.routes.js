import { Router } from "express";
import {
  createQuiz,
   getQuizByVideo,
  submitQuiz,
} from "../controllers/quiz.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post("/create", verifyJWT, createQuiz); // Only for instructors
router.get("/:videoId", verifyJWT, getQuizByVideo);
router.post("/:videoId/submit", verifyJWT, submitQuiz);

export default router;
