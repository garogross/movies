import express from "express";
import {
    checkIfFieldsAreUpdatable,
    deactivateCurrUser,
    deleteUser,
    forgotPassword,
    getCurrUser, getUser,
    login,
    resetPassword, resizeUserImage,
    signUp,
    updatePassword, updateUserData, uploadImageFile
} from "../controllers/userController.js";
import {protect,restrictTo} from "../controllers/authController.js";

export const userRouter = express.Router()

userRouter.post(
    '/signUp',
    uploadImageFile,
    resizeUserImage,
    signUp
)
userRouter.post('/login',login)
userRouter.post('/forgotPassword',forgotPassword)
userRouter.patch('/resetPassword/:token',resetPassword)

userRouter.use(protect)

userRouter.patch('/updatePassword',updatePassword)
userRouter.get('/me', getCurrUser, getUser)
userRouter.patch(
    '/updateUserData',
    uploadImageFile,
    resizeUserImage,
    checkIfFieldsAreUpdatable,
    getCurrUser,
    updateUserData
)

userRouter.delete('/deleteCurrUser', deactivateCurrUser)

userRouter.delete(
    '/:id',
    restrictTo('admin', 'lead-guide'),
    deleteUser
)