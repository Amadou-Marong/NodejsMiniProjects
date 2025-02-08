import { Movie } from "../models/movieModel.js"
// validate body
export const validateBody = (req, res, next) => {
    if (!req.body.name || !req.body.duration) {
        return res.status(400).send({
            status: "invalid input",
            message: "Invalid movie data"
        })
    }
    next()
}

// check id
export const checkId = async (req, res, next, value) => {
    const movie = await Movie.findById(value)
    if (!movie) {
        return res.status(404).send({
            status: "not found",
            message: `No movie with ID ${value} found`
        })
    }
    next()
}