import express from "express"
import { getAllMovies, addMovie, getMovieById, updateMovie, deleteMovie, checkID, validateBody} from "../controllers/moviesController.js";

const router = express.Router();

router.param('id', checkID)


router.route("/")
    .get(getAllMovies)
    .post(validateBody, addMovie)

router.route("/:id")
    .get(getMovieById)
    .patch(updateMovie)
    .delete(deleteMovie)


export default router