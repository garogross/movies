import mongoose from "mongoose";
import bcript from "bcrypt"
import validator from "validator";
import crypto from "crypto";
import {createHashedToken} from "../utils/crypto.js";
import {setRequiredProp} from "../utils/setRequiredProp.js";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        ...setRequiredProp('name'),
    },
    email: {
        type: String,
        ...setRequiredProp('email'),
        unique: true,
        validate: [validator.isEmail,"Please write a correct email"]
    },
    password: {
        type: String,
        ...setRequiredProp('password'),
    },
    photo: String,
    passwordConfirm: {
        type: String,
        ...setRequiredProp('password confirm'),
        validate: {
            validator(val) {
                return val === this.password
            },
            message: "Passwords are not equal"
        }

    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    role: {
        type: String,
        enum: ["user",'admin'],
        default: 'user'
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    }
})

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next()
    this.password = await bcript.hash(this.password,16)
    this.passwordConfirm = undefined
    next()
} )

userSchema.pre(/^find/,function(next){
    this.find({active: {$ne: false}}).select('-__v')
    next()
})

userSchema.methods.comparePassword = async function (candidatePassword,userPassword) {
    return await bcript.compare(candidatePassword,userPassword)
}

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString("hex")

    this.passwordResetToken = createHashedToken(resetToken)

    return resetToken;
}

export const User = mongoose.model("User",userSchema)