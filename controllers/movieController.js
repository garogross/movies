import {HandlerFactory} from "./HandlerFactory.js";
import {Movie} from "../models/movieModel.js";
import {uploadImage} from "../utils/multer.js";
import {resizeImage} from "../utils/sharp.js";
import {catchAsync} from "../utils/catchAsync.js";
import {AppError} from "../utils/appError.js";
import {countryNames, languages} from "../constants.js";

const handleFactory = new HandlerFactory(Movie, 'movie')


export const uploadMoviePhoto = uploadImage.single("photo")

export const resizeMoviePhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next()

    const fileName = `movie-${req.user.id}-${Date.now()}.jpeg`

    req.file.filename = fileName
    req.body.photo = `movies/${fileName}`
    await resizeImage(req.file.buffer, `public/images/movies/${req.file.filename}`)
    next()
})

export const addMovie = handleFactory.create()
export const getMovies = handleFactory.getAll()
export const updateMovie = handleFactory.updateOne()

export const likeMovie = catchAsync(async (req, res, next) => {
    const {movieId} = req.params

    const movie = await Movie.findById(movieId).select('+likedUsers')

    if (!movie) return next(new AppError('Movie by this id does not exist.'))

    if(movie.likedUsers?.includes(req.user.id)) return next(new AppError('This user already has been liked this movie'))
    movie.likedUsers.push(req.user.id)
    movie.likes = movie.likedUsers.length
    await movie.save()

    const {likedUsers,...data}  = {...movie.toObject()}

    res.send({
        status: 'success',
        data
    })
})

export const getMovieLikedUsers = catchAsync(async (req,res,next) => {
    const {movieId} = req.params

    const movie = await Movie.findById(movieId).select('+likedUsers').populate({
        path: 'likedUsers',
        select: '-__v -role -password'
    })

    if (!movie) return next(new AppError('Movie by this id does not exist.'))

    res.send({
        status: "success",
        data: {
            id: movie.id,
            likedUsers: movie.likedUsers
        }
    })
})


export const getMovieDetails = handleFactory.getOne('reviews actors producers')

export const getCountries = catchAsync(async (req,res) => {
    res.send({
        status: 'success',
        data: countryNames
    })
})

export const getLanguages = catchAsync(async (req,res) => {
    res.send({
        status: 'success',
        data: languages
    })
})