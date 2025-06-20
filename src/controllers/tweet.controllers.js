import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.models.js"
import {User} from "../models/user.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    const {content} = req.body
    if(!content){
        throw new ApiError(400 , "Content is required")
    }

    let tweet
    try {
        tweet = await Tweet.create(
            {
                content: content,
                owner: new mongoose.Types.ObjectId(req.user?._id)
            }
        )
    } catch (error) {
        throw new ApiError(400 , "Some error occured while creating tweet")
    }

    res.status(200).json(new ApiResponse(200 , "Created tweet successfully"))
})

const getUserTweets = asyncHandler(async (req, res) => {
     const { userId } = req.params;
  if (!userId) {
    throw new ApiError(400, "could not retrive userId from params");
  }

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Please provide a valid userId");
  }

  let usertweets;

  try {
    usertweets = await Tweet.find({owner: userId})
  } catch (error) {
    throw new ApiError(400, "Some error occured while fetching tweets");
  }

  if (!usertweets || usertweets.length === 0) {
    throw new ApiError(404, "No tweets found for this user");
  }

  res.status(200).json(new ApiResponse(200, usertweets,"Fetched user tweets successfully", usertweets));
})

const updateTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const { content } = req.body;

    if (!tweetId) {
        throw new ApiError(400, "Tweet ID is required");
    }

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Please provide a valid tweet ID");
    }

    if (!content) {
        throw new ApiError(400, "Content is required to update the tweet");
    }

    let updatedtweet;
    try {
        updatedtweet = await Tweet.findByIdAndUpdate(
            tweetId,
            { content: content },
            { new: true }
        );
    } catch (error) {
        throw new ApiError(400, "Some error occurred while updating the tweet");
    }

    if (!updatedtweet) {
        throw new ApiError(404, "Tweet not found");
    }

    res.status(200).json(new ApiResponse(200, updatedtweet, "Updated tweet successfully"));
})

const deleteTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;

    if (!tweetId) {
        throw new ApiError(400, "Tweet ID is required");
    }

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Please provide a valid tweet ID");
    }

    let deletedtweet;
    try {
        deletedtweet = await Tweet.findByIdAndDelete(tweetId);
    } catch (error) {
        throw new ApiError(400, "Some error occurred while deleting the tweet");
    }

    if (!deletedtweet) {
        throw new ApiError(404, "Tweet not found");
    }

    res.status(200).json(new ApiResponse(200, null, "Deleted tweet successfully"));
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}