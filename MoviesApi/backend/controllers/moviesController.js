import fs from "fs"
const movies = JSON.parse(fs.readFileSync('./data/movies.json'))

export const checkID = (req, res, next, value) => {
    console.log(`Movie ID is ${value}`);
    
    // find movie based on parameter
    const movie = movies.find(el => el.id === value * 1)
    
    if(!movie) {
        return res.status(404).send({
            status: "not found",
            message: `No movie with ID ${value} found`
        })
    }
    
    next()
}

export const validateBody = (req, res, next) => {
    if(!req.body.title || !req.body.year){
        return res.status(400).send({
            status: "invalid input",
            message: "Invalid movie data"
        })
    }
    next()
}


export const getAllMovies = (req, res) => {
    try {
        
        res.status(200).send({
            requestedAt: req.requestedAt,
            status: "success",
            data: {
                movies: movies
            }
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error
        })        
    }
}

export const addMovie = (req, res) => {
    try {
        const newId = movies[movies.length -1].id + 1
        // const newMovie = {id: newId, title: req.body.title, year: req.body.year}
        const newMovie = Object.assign({id: newId}, req.body)

        movies.push(newMovie)

        fs.writeFile('./data/movies.json', JSON.stringify(movies), () => {
            res.status(201).send({
                status: "success",
                data: {
                    movies: movies
                }
            })
        })
        
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error
        })
    }
}

export const getMovieById = (req, res) => {
    try {
        const id = req.params.id * 1
        
        const movie = movies.find(el => el.id === id)

        // if (!movie) {
        //     return res.status(404).send({
        //         status: "not found",
        //         message: `No movie with ID ${id} was found`
        //     })
        // }

        res.status(200).send({
            status: "success",
            data: {
                movie: movie
            }
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error
        })        
    }
}

export const updateMovie = (req, res) => {
    try {
        const id = req.params.id * 1
        const movieToUpdate = movies.find(el => el.id === id)

        // if(!movieToUpdate) {
        //     return res.status(404).send({
        //         status: "not found",
        //         message: `No movie with ID ${id} was found`
        //     })
        // }

        const index = movies.indexOf(movieToUpdate)
        const updatedMovie = Object.assign(movieToUpdate, req.body)
        movies[index] = updatedMovie

        fs.writeFile("./data/movies.json", JSON.stringify(movies), () => {
            res.status(200).send({
                status: "success",
                data: {
                    movie: updatedMovie
                }
            })
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error
        })
    }
}

export const deleteMovie = (req, res) => {
    try {
        const id = req.params.id * 1
        const movieToDelete = movies.find(el => el.id === id)

        // if(!movieToDelete) {
        //     return res.status(404).send({
        //         status: "not found",
        //         message: `No movie with ID ${id} found`
        //     })
        // }
        const index = movies.indexOf(movieToDelete)

        movies.splice(index, 1)

        fs.writeFile("./data/movies.json", JSON.stringify(movies), () => {
            res.status(204).send({
                status: "no content"
            })
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error
        })        
    }
}