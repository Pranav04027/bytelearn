import {Router} from "express";
import { registerUser,
         logoutUser,
         loginUser,
         refreshAccessToken,
         changeCurrentPassword,
         getCurrentUser,
         updateAccountDetails,
         updateUserAvatar,
         updateUserCoverImage,
         getUserChannelProfile,
<<<<<<< HEAD
         getWatchHistory,
         getLearnerDashboard
=======
         getWatchHistory
>>>>>>> f40e5f10f34a097e96bb54188a6106ccb3fdd904
        } from "../controllers/user.controllers.js";
import {upload} from "../middlewares/multer.middlewares.js"
import {verifyJWT} from "../middlewares/auth.middlewares.js"


const router = Router()

//Syntax of including multer middleware between the url and the logic.
// Used differently because it requires config/options.
router.route("/register").post(
    upload.fields([ //multer.fields() RETURNS a middleware function with next() built-in
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser) //raw JSON body, "username", "password", "email"

router.route("/refresh-token").post(refreshAccessToken) //No input required but should be logged in

//secured routes

router.route("/logout").post(verifyJWT , logoutUser) //No input required but should be logged in

router.route("/change-password").patch(verifyJWT, changeCurrentPassword) //give JSON raw body oldPassword , newPassword

router.route("/current-user").get(verifyJWT, getCurrentUser) // Nothing, Just Should be logged in

router.route("/update-account-details").patch(verifyJWT, updateAccountDetails) // username , email

<<<<<<< HEAD
router.get("/dashboard", verifyJWT, getLearnerDashboard);

=======
>>>>>>> f40e5f10f34a097e96bb54188a6106ccb3fdd904
router.route("/update-avatar").patch(
    verifyJWT,
    upload.single("avatar"),
    updateUserAvatar
)

router.route("/update-coverimage").patch(
    verifyJWT,
    upload.single("coverImage"),
    updateUserCoverImage
)

router.route("/c/:username").get(verifyJWT, getUserChannelProfile)

router.route("/watch-history").get(verifyJWT, getWatchHistory)

export default router