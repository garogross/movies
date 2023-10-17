import mongoose from "mongoose";
import {setRequiredProp} from "../utils/setRequiredProp.js";


const movieReviewSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.ObjectId,
        ref: 'Movie',
        ...setRequiredProp('movie id')
    },
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        ...setRequiredProp('sender id')
    },
    comment: {
      type: String,
      ...setRequiredProp('comment')
    },
    createdAt: Date
})

movieReviewSchema.pre('save',function(next) {
    this.createdAt = Date.now()
    next()
})

export const MovieReview = mongoose.model('MovieReview',movieReviewSchema)