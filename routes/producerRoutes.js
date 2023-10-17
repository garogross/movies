import express from "express";
import {protect, restrictTo} from "../controllers/authController.js";
import {
    addProducers,
    getProducerDetails,
    getProducers,
    resizeProducerAvatar,
    uploadProducerAvatar
} from "../controllers/producerController.js";

export const producerRouter = express.Router()


producerRouter.use(protect)


producerRouter.get('/',getProducers)
producerRouter.get('/:id',getProducerDetails)

producerRouter.use(protect)

// private routes

producerRouter.post(
    '/add',
    restrictTo('admin'),
    uploadProducerAvatar,
    resizeProducerAvatar,
    addProducers,
)