import {HandlerFactory} from "./HandlerFactory.js";
import {MovieReview} from "../models/movieReviewModel.js";
import {AppError} from "../utils/appError.js";
import mongoose from "mongoose";
import {catchAsync} from "../utils/catchAsync.js";


const handleFactory = new HandlerFactory(MovieReview,'movie Review')

export const addIdParamsToBody = (req,res,next) => {
    if(req.user.id) req.body.sender = req.user.id
    if(req.params.movieId) req.body.movie = req.params.movieId
    next()
}

export const checkIsSender = async (req,res,next) => {
    const review = await MovieReview.findById(req.params.id)

    if(!review) {
        return next(new AppError(`No Review found with that id`,404))
    }
    const userId = new mongoose.Types.ObjectId(req.user.id)
    if(req.user.role !== 'admin' && !userId.equals(review.sender)) {
            return next(new AppError(`You can delete and update only your reviews`,400))
    }
    req.review = review
    next()
}

export const sendMovieReview = handleFactory.create()
export const deleteMovieReview = catchAsync(async (req,res) => {
    await req.review.deleteOne()

    res.send({
        status: 'success'
    })
})

export const updateMovieReview = catchAsync(async (req,res,next) => {
    const comment = req.body?.comment

    if(!comment) {
        return next(new AppError("comment can't be empty or undefined"))
    }

    await req.review.updateOne({},{comment},{
        new: true,
        runValidators: true
    })

    res.send({
        status: 'success',
    })
})

export const getMovieReviews = handleFactory.getAll({
    path: 'movie sender',
    select: '-__v -password -role'
})
