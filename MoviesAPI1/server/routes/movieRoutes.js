import express from "express"

import { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie, getMovieStats} from "../controllers/moviesController.js"
import { checkId, validateBody } from "../middlewares/validateMovie.js";
import { getHighestRatedMovies } from "../middlewares/getHighestRated.js";
import { isAuthenticated } from "../controllers/authController.js";

const router = express.Router();

router.param('id', checkId)

// get highest rated movies
router.route("/highest-rated").get(getHighestRatedMovies, getAllMovies)

// get movie statistics
router.route("/movie-stats").get(getMovieStats)

router.route("/")
    .get(isAuthenticated, getAllMovies)
    .post(validateBody, createMovie)

router.route("/:id")
    .get(getMovieById)
    .put(validateBody, updateMovie)
    .delete(deleteMovie)


export default router