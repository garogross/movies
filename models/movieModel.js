import mongoose from "mongoose";
import {setRequiredProp} from "../utils/setRequiredProp.js";
import {countryNames, filmGenresArr, languages} from "../constants.js";


const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        ...setRequiredProp('Name')
    },
    genres: [{
        type: String,
        enum: filmGenresArr,
    }],
    languages: [{
        type: String,
        enum: languages,
    }],
    country: {
        type: String,
        enum: countryNames,
    },
    durationMins: {
        type: Number,
        ...setRequiredProp('duration')
    },
    year: {
        type: Number,
        ...setRequiredProp('Year'),
        validate: {
            validator(val) {
                return val.toString().length === 4
            },
            message: 'Year must consist of 4 digits'
        }
    },
    likedUsers: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        select: false,
        unique: false,
    }],
    likes: {
        type: Number,
        default: 0
    },
    photo: {
        type: String,
        ...setRequiredProp('photo')
    },
    filmUrl: {
        type: String,
        ...setRequiredProp('film'),
        unique: true
    },
    trailerUrl: {
        type: String,
        ...setRequiredProp('trailer url'),
        unique: true
    },
    actors: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Actor',
        unique: false,
    }],
    producers: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Producer',
        unique: false,
    }]
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})


movieSchema.virtual('reviews', {
    ref: 'MovieReview',
    localField: '_id',
    foreignField: 'movie'
})


export const Movie = mongoose.model('Movie',movieSchema)