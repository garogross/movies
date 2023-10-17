import {Producer} from "../models/producerModel.js";
import {HandlerFactory} from "./HandlerFactory.js";
import {uploadImage} from "../utils/multer.js";
import {catchAsync} from "../utils/catchAsync.js";
import {resizeImage} from "../utils/sharp.js";


const handleFactory = new HandlerFactory(Producer, 'producer')



export const uploadProducerAvatar = uploadImage.single("avatar")

export const resizeProducerAvatar = catchAsync(async (req, res, next) => {
    if (!req.file) return next()

    const fileName = `producer-${req.body.name.replace(" ","-").toLowerCase()}-${Date.now()}.jpeg`

    req.file.filename = fileName
    req.body.avatar = `producers/${fileName}`
    await resizeImage(req.file.buffer, `public/images/producers/${req.file.filename}`,[100,100])
    next()
})

export const addProducers = handleFactory.create()
export const getProducers = handleFactory.getAll()
export const getProducerDetails = handleFactory.getOne('movies')