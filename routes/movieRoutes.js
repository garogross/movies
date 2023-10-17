import express from "express";
import {protect, restrictTo} from "../controllers/authController.js";
import {
    addMovie, getCountries, getLanguages, getMovieDetails, getMovieLikedUsers, getMovies, likeMovie,
    resizeMoviePhoto, updateMovie,
    uploadMoviePhoto
} from "../controllers/movieController.js";


export const movieRouter = express.Router()

movieRouter.get('/',getMovies)
movieRouter.get('/countries',getCountries)
movieRouter.get('/languages',getLanguages)
movieRouter.get('/:id',getMovieDetails)

movieRouter.use(protect)

movieRouter.post(
    '/add',
    restrictTo('admin'),
    uploadMoviePhoto,
    resizeMoviePhoto,
    addMovie
)

movieRouter.put(
    '/update/:id',
    restrictTo('admin'),
    uploadMoviePhoto,
    resizeMoviePhoto,
    updateMovie
    )

movieRouter.use(restrictTo('user'))

movieRouter.post('/likeMovie/:movieId', likeMovie)
movieRouter.get('/movieLikedUsers/:movieId', getMovieLikedUsers)