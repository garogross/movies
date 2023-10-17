import express from "express";
import {
    addIdParamsToBody, checkIsSender,
    deleteMovieReview,
    getMovieReviews,
    sendMovieReview, updateMovieReview
} from "../controllers/movieReviewController.js";
import {protect, restrictTo} from "../controllers/authController.js";

export const movieReviewRouter = express.Router()



movieReviewRouter.use(protect)


movieReviewRouter.get('/',restrictTo('admin'),getMovieReviews)
movieReviewRouter
    .route('/:id')
    .delete(checkIsSender,deleteMovieReview)
    .patch(checkIsSender,updateMovieReview)

movieReviewRouter.use(restrictTo('user'))

movieReviewRouter.post('/send/:movieId',addIdParamsToBody,sendMovieReview)