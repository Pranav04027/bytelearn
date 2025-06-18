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
    import { errorHandler } from "./middlewares/error.middlewares.js"


    //use routes
    app.use("/api/v1/healthcheck" , healthcheckRouter) //this will forward control to health.routs.js
    app.use("/api/v1/users" , userRouter)
    app.use("/api/v1/playlists", playlistRouter)
    app.use("/api/v1/videos", videoRouter)
    


    app.use(errorHandler)
    export {app}
