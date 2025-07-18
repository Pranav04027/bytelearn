    //Setup routes, middlewares, Express setup
    //You define how it behaves when a request comes in
    
    import express from "express"
    import cors from "cors" //a middleware
    import cookieParser from "cookie-parser"


    const app = express()

    app.use(
        cors({
            origin: process.env.CORS_ORIGIN,
            credentials: true //To allow cookies
        })
    )

    app.use(express.json({limit: "16kb"})) 

    app.use(express.urlencoded({extended: true , limit: "16kb"}))

    app.use(express.static("public"))

    app.use(cookieParser())


    

    //import routes
    import healthcheckRouter from "./routes/health.routes.js"
    import userRouter from "./routes/user.routes.js"
    import playlistRouter from "./routes/playlist.routes.js"
    import videoRouter from "./routes/video.routes.js"
    import subscriptionRouter from "./routes/subscription.routes.js"
    import commentRouter from "./routes/comment.routes.js"
    import tweetRouter from "./routes/tweet.routes.js"
    import likeRouter from "./routes/like.routes.js"
    import dashboardRouter from "./routes/dashboard.routers.js"
    import { errorHandler } from "./middlewares/error.middlewares.js"
<<<<<<< HEAD
    import bookmarkRouter from "./routes/bookmark.routes.js";
    import progressRouter from "./routes/progress.routes.js";
    import recommendationRouter from "./routes/recommendation.routes.js";
    import quizRouter from "./routes/quiz.routes.js";
=======
>>>>>>> f40e5f10f34a097e96bb54188a6106ccb3fdd904


    //use routes
    app.use("/api/v1/healthcheck" , healthcheckRouter) //this will forward control to health.routs.js
    app.use("/api/v1/users" , userRouter)
    app.use("/api/v1/playlists", playlistRouter)
    app.use("/api/v1/videos", videoRouter)
    app.use("/api/v1/subscriptions", subscriptionRouter)
    app.use("/api/v1/comments", commentRouter)
    app.use("/api/v1/tweets", tweetRouter)
    app.use("/api/v1/likes", likeRouter)
    app.use("/api/v1/dashboard", dashboardRouter)
<<<<<<< HEAD
    app.use("/api/v1/bookmarks", bookmarkRouter);
    app.use("/api/v1/progress", progressRouter);
    app.use("/api/v1/recommendations", recommendationRouter);
    app.use("/api/v1/quizzes", quizRouter);
=======
    
>>>>>>> f40e5f10f34a097e96bb54188a6106ccb3fdd904


    app.use(errorHandler)
    export {app}
