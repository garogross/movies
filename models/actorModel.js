import mongoose from "mongoose";
import {setRequiredProp} from "../utils/setRequiredProp.js";

const actorSchema = new mongoose.Schema({
    name: {
        type: String,
        ...setRequiredProp('Name')
    },
    avatar: {
        type: String,
        ...setRequiredProp('Avatar')
    },
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})


actorSchema.virtual('movies', {
    ref: 'Movie',
    localField: '_id',
    foreignField: 'actors'
})

export const Actor = mongoose.model('Actor',actorSchema)
