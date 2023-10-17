import {catchAsync} from "../utils/catchAsync.js";
import {AppError} from "../utils/appError.js";
import {ApiFeatures} from "../utils/apiFeatures.js";


export class HandlerFactory {
    constructor(Model,docName) {
        this.Model = Model
        this.docName = docName
    }

    create () {
        const {Model} = this
        return catchAsync(async (req,res) => {
            const doc = await Model.create(req.body)
            res.status(201).json({
                status: "success",
                data: doc
            })
        })

    }

    updateOne () {
        const {Model,docName} = this
        return catchAsync(async (req,res) => {
            const doc = await Model.findByIdAndUpdate(req.params.id,req.body,{
                new: true,
                runValidators: true
            }).select('-password')
            console.log(doc)
            if(!doc) {
                return next(new AppError(`No ${docName} found with that id`,404))
            }

            res.status(200).json({
                status: "success",
                data: doc
            })
        })
    }

    deleteOne() {
        const {Model,docName} = this

        return catchAsync(async (req,res,next) => {
            const doc = await Model.findByIdAndDelete(req.params.id)

            if(!doc) {
                return next(new AppError(`No ${docName} found with that id`,404))
            }

            res.send({
                status: "success",
            })
        })
    }

    deleteAll() {
        const {Model} = this
        return catchAsync(async (req, res) => {
            await Model.deleteMany()
            res.status(200).send({
                status: 'success',
                message: 'cleared'
            })
        })
    }

    getMe()  {
        return function (req,res,next) {
            req.params.id = req.user.id
            next()
        }
    }

    getOne(populateOptions) {
        const {Model,docName} = this
        return catchAsync(async (req, res,next) => {
            let query = Model.findById(req.params.id)

            if(populateOptions) {
                query = query.populate(populateOptions)
            }
            const doc = await query


            if(!doc) {
                return next(new AppError(`No ${docName} found with that id`,404))
            }

            res.send({
                status: 'success',
                data: doc
            })
        })
    }

    getAll(populateOptions) {
        const {Model} = this
        return catchAsync(async (req, res) => {
            let filter = {}
            let query = Model.find(filter)

            if(populateOptions) query = query.populate(populateOptions)

            const features = new ApiFeatures(query, req.query)
                .filter()
                .sort()
                .paginate()

            const doc = await features.query
            res.send({
                status: 'success',
                result: doc.length,
                data: doc
            })
        })
    }
}