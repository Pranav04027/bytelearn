import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) {
    throw new ApiError(400, "Video ID is required");
  }
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Please provide a valid video ID");
  }

  // Check if the like already exists
  const existingLike = await Like.findOne({
    $and: [{ likedBy: req.user?._id }, { video: videoId }],
  });

  // If it exists, delete it (unlike)
  if (existingLike) {
    try {
      await existingLike.deleteOne();
      return res
        .status(200)
        .json(new ApiResponse(200, "Video unliked successfully"));
    } catch (error) {
      throw new ApiError(400, "Some problem occurred while unliking the video");
    }
  } else {
    // If it doesn't exist, create a new like
    try {
      const newLike = await Like.create({
        likedBy: req.user._id,
        video: videoId,
      });
      return res
        .status(201)
        .json(new ApiResponse(201, "Video liked successfully", newLike));
    } catch (error) {
      throw new ApiError(400, `Error while liking the video: ${error.message}`);
    }
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (!commentId) {
    throw new ApiError(400, "Comment ID is required");
  }
  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Please provide a valid comment ID");
  }
  // Check if the like already exists
  const existingLike = await Like.findOne({
    $and: [{ likedBy: req.user?._id }, { comment: commentId }],
  });

  // If it exists, delete it (unlike)
  if (existingLike) {
    try {
      await existingLike.deleteOne();
      return res
        .status(200)
        .json(new ApiResponse(200, "Comment unliked successfully"));
    } catch (error) {
      throw new ApiError(
        400,
        "Some problem occurred while unliking the comment"
      );
    }
  } else {
    // If it doesn't exist, create a new like
    try {
      const newLike = await Like.create({
        likedBy: req.user._id,
        comment: commentId,
      });
      return res
        .status(201)
        .json(new ApiResponse(201, "Comment liked successfully", newLike));
    } catch (error) {
      throw new ApiError(
        400,
        `Error while liking the comment: ${error.message}`
      );
    }
  }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  if (!tweetId) {
    throw new ApiError(400, "Tweet ID is required");
  }
  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Please provide a valid tweet ID");
  }

  // Check if the like already exists
  const existingLike = await Like.findOne({
    $and: [{ likedBy: req.user?._id }, { tweet: tweetId }],
  });

  // If it exists, delete it (unlike)
  if (existingLike) {
    try {
      await existingLike.deleteOne();
      return res
        .status(200)
        .json(new ApiResponse(200, "Tweet unliked successfully"));
    } catch (error) {
      throw new ApiError(400, "Some problem occurred while unliking the tweet");
    }
  } else {
    // If it doesn't exist, create a new like
    try {
      const newLike = await Like.create({
        likedBy: req.user._id,
        tweet: tweetId,
      });
      return res
        .status(201)
        .json(new ApiResponse(201, "Tweet liked successfully", newLike));
    } catch (error) {
      throw new ApiError(400, `Error while liking the tweet: ${error.message}`);
    }
  }
});

const getLikedVideos = asyncHandler(async (req, res) => {
  const likedVideos = await Like.aggregate([
    {
      $match: {
        likedBy: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "videoDetails",
      },
    },
    {
      $unwind: "$videoDetails",
    },
    {
      $project: {
        _id: 1,
        videoDetails: 1,
        createdAt: 1,
      },
    },
  ]);

  res.status(200).json(
    new ApiResponse(200, likedVideos ,"Liked videos fetched successfully")
  );
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };