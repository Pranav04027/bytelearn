import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Playlist } from "../models/playlist.models.js";
import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import { json } from "express";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    throw new ApiError(400, "All fiels are required");
  }

  let playlist;

  playlist = await Playlist.create({
    name,
    description,
    owner: req.user?._id,
  });
  if (!playlist) {
    throw new ApiError(501, "A problem occured while creating the playlist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Successfully created the playlist"));
});

// Get my playlists
const getMyPlaylists = asyncHandler(async (req, res) => {
  const playlist = await Playlist.find({ owner: req.user?._id });
  if (!playlist) {
    throw new ApiError(500, "An error occured while finding the Playlist");
  }

  res
    .status(200)
    .json(new ApiResponse(200, playlist, "Retrived playlist sucessfully"));
});

//Get playlist of any user by UserId in parameters
const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(400, "Could not get userId from params");
  }

  const playlist = await Playlist.find({ owner: userId });

  if (!playlist) {
    throw new ApiError(500, "Could not get the playlists");
  }

  res
    .status(200)
    .json(new ApiResponse(200, playlist, "Retrived playlists successfully"));
});


const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if(!playlistId || !videoId){
    throw new ApiError(400 , "Could not get data from URL params")
  }

  const playlist = await Playlist.findByIdAndUpdate(
    playlistId , 
    {$addToSet: {videos: videoId}}, //Prevents Duplicates
    {new: true}
  )

  if(!playlist){
    throw new ApiError(400 , "Something went wrong while hitting DB to add")
  }

  res.status(200).json(new ApiResponse(200 . playlist, "Added successfully"))


});




export { createPlaylist, getMyPlaylists , getUserPlaylists};
