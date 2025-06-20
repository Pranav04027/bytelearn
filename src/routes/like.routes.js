import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
  getLikedVideos,
} from "../controllers/like.controllers.js";

const router = Router();

//Protected routes
router.route("/likevideo/:videoId").post(verifyJWT, toggleVideoLike);

router.route("/likecomment/:commentId").post(verifyJWT, toggleCommentLike);

router.route("/liketweet/:tweetId").post(verifyJWT, toggleTweetLike);

router.route("/likedvideos").get(verifyJWT, getLikedVideos);

export default router;