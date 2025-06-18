import {Router} from "express"
import {verifyJWT} from "../middlewares/auth.middlewares.js"
import {upload} from "../middlewares/multer.middlewares.js"
import {
        publishVideo,
        getVideoById,

} from "../controllers/video.controllers.js"

const router = Router()

//Unprotectd Routes
router.route

//Protected Routes
router.route("/uploadvideo").post(verifyJWT , 
    upload.fields([
        {
            name: "video",
            maxCount: 1
        },
        {
            name: "thumbnail",
            maxCount: 1
        }
    ]),
    publishVideo
)

export default router