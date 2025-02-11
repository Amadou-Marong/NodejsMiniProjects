import { Movie } from "../models/movieModel.js"
import { queryFeatures } from "../utils/queryFeatures.js";

// export const getAllMovies = async (req, res) => {
//     try {
//         //  to implement filters
//         let queryString = JSON.stringify(req.query)
//         queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`)
//         let queryObj = JSON.parse(queryString)


//         // const movies = await Movie.find(queryObj) // if we are to sort then we dont need to await
//         let query = Movie.find(queryObj) 

//         // SORTING
//         if(req.query.sort) {
//             const sortBy = req.query.sort.split(',').join(' ')
//             query = query.sort(sortBy)
//         } else {
//             query = query.sort('-createdAt')
//         }


//         // LIMIT FIELDS
//         if(req.query.fields) {
//             const fields = req.query.fields.split(',').join(' ')
//             query = query.select(fields)
//         }


//         // PAGINATION
//         const page = req.query.page * 1 || 1 
//         const limit = req.query.limit * 1 || 10
        
//         console.log(typeof limit, typeof page);
        
//         //  Skip 1-10, 2-10, 3-10
//         const skip = (page - 1) * limit

//         console.log(typeof skip, typeof page);
        
              
//         query = query.skip(skip).limit(limit)
        
//         if(req.query.page) {
//             const moviesCount = await Movie.countDocuments()
//             if(skip >= moviesCount) {
//                 throw new Error("Page does not exist")
//             }
//         }

//         const movies = await query;

//         console.log(movies);
        
                

//         // const movies = await Movie.find(req.query)
//         // const movies = await Movie.find().where('duration')
//         //                                 .equals(req.query.duration)
//         //                                 .where('rating')
//         //                                 .equals(req.query.rating)

//         res.status(200).send({
//             status:"success",
//             count: movies.length,
//             data: {
//                 movies
//             }
//         })
//     } catch (error) {
//         res.status(500).send({
//             status: "error",
//             message: error.message
//         })
//     }
// }

export const getAllMovies = async (req, res) => {
    try {
        // // Destructure query parameters
        const {query, page, limit, filters} = queryFeatures(Movie, req.query)

        const totalMovies = await Movie.countDocuments(filters);
        // Execute Query
        const movies = await query;

        if (!movies.length) {
            return res.status(200).json({
                status: "success",
                count: 0,
                data: { movies: [] },
                message: "No movies found for this page."
            });
        }

        res.status(200).json({
            status: "success",
            count: movies.length,
            totalMovies,
            totalPages: Math.ceil(totalMovies / limit),
            currentPage: page,
            data: { movies }
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

// Get Movie Stats
export const getMovieStats = async (req, res) => {
    try {
        const stats = await Movie.aggregate([
            {$match: {rating: {$gte: 4.5}}},
            {$group: {
                _id: '$rating',
                numMovies: {$sum: 1},
                avgRating: {$avg: '$rating'},
                minDuration: {$min: '$duration'},
                maxDuration: {$max: '$duration'}
            }}
        ])

        res.status(200).send({
            status: "success",
            data: {
                stats
            }
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
        })
    }
}


// createMovie

export const createMovie = async (req, res) => {
    try {
        const movie = new Movie(req.body)
        await movie.save()
        res.status(201).send({
            status: "success",
            data: {
                movie: movie
            }
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
        })
    }
}

// getMovie

export const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        res.status(200).send({
            status: "success",
            data: {
                movie: movie
            }
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
        })
    }
}

// updateMovie

export const updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).send({
            status: "success",
            data: {
                movie: movie
            }
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
        })
    }
}

// deleteMovie

export const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id)
        res.status(204).send({
            status: "success",
            data: null
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
        })
    }
}