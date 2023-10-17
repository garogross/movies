import {Actor} from "../models/actorModel.js";
import {HandlerFactory} from "./HandlerFactory.js";
import {uploadImage} from "../utils/multer.js";
import {catchAsync} from "../utils/catchAsync.js";
import {resizeImage} from "../utils/sharp.js";


const handleFactory = new HandlerFactory(Actor, 'actor')


export const uploadActorAvatar = uploadImage.single("avatar")

export const resizeActorAvatar = catchAsync(async (req, res, next) => {
    if (!req.file) return next()

    const fileName = `actor-${req.body.name.replace(" ","-").toLowerCase()}-${Date.now()}.jpeg`

    req.file.filename = fileName
    req.body.avatar = `actors/${fileName}`
    await resizeImage(req.file.buffer, `public/images/actors/${req.file.filename}`,[100,100])
    next()
})

export const addActors = handleFactory.create()
export const getActors = handleFactory.getAll()
export const getActorDetails = handleFactory.getOne('movies')