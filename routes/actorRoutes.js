import express from "express";
import {protect, restrictTo} from "../controllers/authController.js";
import {
    addActors, getActorDetails,
    getActors,
    resizeActorAvatar,
    uploadActorAvatar
} from "../controllers/actorController.js";

export const actorRouter = express.Router()


actorRouter.get('/',getActors)
actorRouter.get('/:id',getActorDetails)

actorRouter.use(protect)

// private routes

actorRouter.post(
    '/add',
    restrictTo('admin'),
    uploadActorAvatar,
    resizeActorAvatar,
    addActors,
    )