import { Router } from "express";
import {
  createTweet,
  getUserTweets,
  updateTweet,
  deleteTweet,
} from "../controllers/tweet.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();
//Public routes
router.route("/usertweets/:userId").get(getUserTweets);

//Protected routes

router.route("/createtweet").post(verifyJWT, createTweet)

router.route("/updatetweet/:tweetId").patch(verifyJWT, updateTweet);

router.route("/deletetweet/:tweetId").delete(verifyJWT, deleteTweet);

export default router;