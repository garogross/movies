import {catchAsync} from "../utils/catchAsync.js";
import jwt from "jsonwebtoken"
import {User} from "../models/userModel.js";
import {AppError} from "../utils/appError.js";
import {Email} from "../utils/email.js";
import {createHashedToken} from "../utils/crypto.js";
import {HandlerFactory} from "./HandlerFactory.js"
import {uploadImage} from "../utils/multer.js";
import {resizeImage} from "../utils/sharp.js";

const handlerFactory = new HandlerFactory(User, 'user')

export const uploadImageFile = uploadImage.single("photo")

export const resizeUserImage = catchAsync(async (req, res, next) => {
    if (!req.file) return next()

    req.file.filename = `user-${req?.user?.id || Math.round(Math.random() * 100)}-${Date.now()}.jpeg`
    req.body.photo = `users/${req.file.filename}`
    await resizeImage(req.file.buffer, `public/images/users/${req.file.filename}`)
    next()
})

const filterUserFields = (obj,fields) => {
    const result = {}
    fields.forEach(item => {
        if(obj[item]) {
            result[item] = obj[item]
        }
    })

    return result
}

export const checkIfFieldsAreUpdatable = (req,res,next) => {
    const updatableFields = ['name','email','photo']
    const filteredFields = filterUserFields(req.body,updatableFields)

    if(!Object.keys(filteredFields).length) {
        return next(new AppError(`there is no any updatable fields,You can only change this fields: ${updatableFields.join(',')}`))
    }

    req.body = filteredFields
    next()

}

const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, )
}

const createAndSendToken = (user,res) => {
    const token = signToken(user._id)

    user.password = undefined

    res.send({
        token
    })
}

export const signUp = catchAsync(async (req,res) => {
    const {name,email,password,passwordConfirm,role,photo} = req.body

    const user = await User.create({
        name,
        email,
        password,
        passwordConfirm,
        role,
        photo
    })

    const {
        password: pass,
        __v,
        ...userData
    } = {...user.toObject()}

    const token = signToken(user._id)

    res.send({
        status: "success",
        data: userData,
        token
    })
})

export const login = catchAsync(async  (req,res,next) => {
    const {email,password} = req.body
    const user = await User.findOne({email})

    if(!user) {
        return next(new AppError("email is not correct"))
    }
    const isPasswordCorrect = await user.comparePassword(password,user.password)
    if(!isPasswordCorrect) {
        return next(new AppError("password is not correct"))
    }

    createAndSendToken(user,res)
})

export const forgotPassword = catchAsync(async (req,res,next) => {
    const {email} = req.body
    if(!email) return next(new AppError('Email is required'));

    const user = await User.findOne({email})
    if(!user) return next(new AppError('Email is wrong'));

    const resetToken = user.createPasswordResetToken()
    await user.save({validateBeforeSave: false})

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`

    try {
        await new Email(user,resetUrl).sendForgotPass();

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email'
        })
    } catch (err) {
        user.passwordResetToken = undefined
    }

})


export const resetPassword = catchAsync(async (req,res,next) => {
    const {token} = req.params
    const {password,passwordConfirm} = req.body

    const hashedToken = createHashedToken(token)
    const user = await User.findOne({
        passwordResetToken: hashedToken
    })

    if (!user) {
        return next(new AppError('Token is invalid', 400))
    }
    user.password = password
    user.passwordConfirm = passwordConfirm
    user.passwordResetToken = undefined
    await user.save()

    createAndSendToken(user,res)

})


export const updatePassword = catchAsync(async (req,res,next) => {
    const {currentPassword,newPassword,passwordConfirm} = req.body

    if (!newPassword || !currentPassword  || !wpasswordConfirm) {
        return next(new AppError('Current password, new password and password confirm fields are required', 400))
    }

    const user = await User.findById(req.user.id)

    if(!user) {
        return next(new AppError("You're not logged in.",401))
    }

    const correctPassword = await user.comparePassword(currentPassword,user.password)

    if(!correctPassword) {
        return next(new AppError("currentPassword is wrong."))
    }

    user.password = newPassword
    user.passwordConfirm = passwordConfirm
    await user.save()

    createAndSendToken(user, res)

})


export const deactivateCurrUser = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, {active: false})

    res.status(204).json({
        status: 'success',
        data: null
    })
})

export const getUsers = handlerFactory.getAll()
export const updateUserData = handlerFactory.updateOne()
export const deleteUser = handlerFactory.deleteOne()
export const clearUsers = handlerFactory.deleteAll()
export const getUser = handlerFactory.getOne()
export const getCurrUser = handlerFactory.getMe()