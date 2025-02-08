
export const getHighestRatedMovies = (req, res, next) => {
    req.query.sort = "-rating"
    req.query.limit = req.query.limit || 5

    next();
}