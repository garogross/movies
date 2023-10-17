import {AppError} from "../utils/appError.js";
import util from "util";
import jwt from "jsonwebtoken";
import {User} from "../models/userModel.js";


export const protect = async (req,res,next) => {
    const {authorization} = req.headers

    let token = ''
    if(authorization && authorization.startsWith('Bearer')) {
        token = authorization.split(' ')[1]
    }

    if(!token) {
        return next(new AppError("You are not logged in please log in to get access.",401))
    }

    const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)

    if(!user) {
        return next(new AppError('The user belonging to this token mo longer exist', 401))
    }

    req.user = user

    next()

}

export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError(`You don't have permission to perform this action`, 403))
        }
        next()
    }
}