import mongoose from "mongoose";
import {setRequiredProp} from "../utils/setRequiredProp.js";

const producerSchema = new mongoose.Schema({
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

producerSchema.virtual('movies', {
    ref: 'Movie',
    localField: '_id',
    foreignField: 'producers'
})


export const Producer = mongoose.model('Producer',producerSchema)
