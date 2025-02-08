import express from "express"

import { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie} from "../controllers/moviesController.js"
import { checkId, validateBody } from "../middlewares/validateMovie.js";
import { getHighestRatedMovies } from "../middlewares/getHighestRated.js";

const router = express.Router();

router.param('id', checkId)

// get highest rated movies
router.route("/highest-rated").get(getHighestRatedMovies, getAllMovies)

router.route("/")
    .get(getAllMovies)
    .post(validateBody, createMovie)

router.route("/:id")
    .get(getMovieById)
    .put(validateBody, updateMovie)
    .delete(deleteMovie)


export default router