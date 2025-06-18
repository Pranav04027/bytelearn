import {v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv"
dotenv.config()

const cloudinaryDelete = async function (...public_ids){ // ... Operator helps with using comma seperated multiple inputs
    try {
        for(const id of public_ids){
            if (id) await cloudinary.uploader.destroy(id)
        }
    } catch (error) {
        console.log("Could not delete the files")
    }
}

export {cloudinaryDelete}

/*
Use as:

await deleteCloudinaryFiles(avatar?.public_id, coverImage?.public_id)

Even though the function itself is marked async and uses await inside,
you still need to await it when calling it, because it returns a Promise.

*/