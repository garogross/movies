import express from "express"
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import {xss} from "express-xss-sanitizer";
import hpp from 'hpp'

import {userRouter} from "./routes/userRoutes.js"
import {globalErrorHandler} from "./controllers/errorController.js";
import {movieRouter} from "./routes/movieRoutes.js";
import {movieReviewRouter} from "./routes/movieReviewRoutes.js";
import {actorRouter} from "./routes/actorRoutes.js";
import {producerRouter} from "./routes/producerRoutes.js";

export const app = express()


app.use(express.json())

app.use(express.static('public'))
app.use('/images', express.static('images'));


app.use(helmet())

const limiter = rateLimit({
    max: 100,
    widowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP,please try again in an hour'
})
app.use('/api', limiter)

app.use(mongoSanitize())

app.use(xss())

app.use(hpp({
    whitelist: ['endDays']
}))
app.use('/api/v1/users',userRouter)
app.use('/api/v1/movies',movieRouter)
app.use('/api/v1/actors',actorRouter)
app.use('/api/v1/producers',producerRouter)
app.use('/api/v1/movie-reviews',movieReviewRouter)

app.use(globalErrorHandler)

