import { uploadOnCloudinary , uploadVideoOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {Video} from "../models/video.models.js"
import mongoose, {isValidObjectId} from "mongoose"

const publishVideo = asyncHandler(async (req, res) => {
    const {title, description} = req.body
    if(!title || !description){
        throw new ApiError(400 , "All fields are required")
    }

    //Check if it exists already
    const videoExists = await Video.findOne(
        {$and: [{title , description}]}
    )
    if(videoExists){
        throw new ApiError(200 , "The video already Exists")
    }

    //Get file path and validate
    const localvidpath = req.files?.video?.[0]?.path;
    const localthumbnailpath = req.files?.thumbnail?.[0]?.path;

    if(!localthumbnailpath || !localvidpath){
        throw new ApiError(404 , "Could not get the paths for files.")
    }


    //upload to cloudinary
    let videofile;
    try {
        videofile = await uploadVideoOnCloudinary(localvidpath);
        console.log("uploaded video on cloudinary" , videofile)
    } catch (error) {
        throw new ApiError(509 , "Error occured while uploading video to cloudinary")
    }

    let thumbnailfile;
    try {
        thumbnailfile = await uploadOnCloudinary(localthumbnailpath);
        console.log("uploaded thumbnail on cloudinary" , thumbnailfile)
    } catch (error) {
        throw new ApiError(509 , "Error occured while uploading thumbnail to cloudinary")
    }

    //create video in DB
    let video;

    try {
        video = Video.create(
            {
                videofile: videofile.url || "",
                thumbnail: thumbnailfile.url || "",
                title,
                description,
                duration: videofile.duration || "0",
                owner: req.user?._id
            }
        )
    } catch (error) {
        throw new ApiError(400 , "Could not create the video in DB", error)
    }

    //check if created properly also get video from DB
    const createdVideo = await Video.findOne(
        {$and: [{title , description}]}
    )
    if(!createdVideo){
        throw new ApiError(200 , "The video was not created properly")
    }

    //response
    return res.status(209).json(new ApiResponse(209 , createdVideo , "Video Created successfully"))
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params; //string
    if(!videoId){
        throw new ApiError(400 , "could not retrive videoId from params")
    }

    if(!isValidObjectId(videoId)){
        throw new ApiError(400, "Please provide a valid videoId")
    }

    const video = await Video.findById(videoId).select
    if(!video){
        throw new ApiError(400 , "Could not retrive video from DB")
    }

    res.status(200).json(new ApiResponse(200, video, "Retrived video successfully"))



})

export {
    publishVideo,
    getVideoById,
    
}