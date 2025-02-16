import mongoose from "mongoose"
import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"

// import router from "./routes/movieRoutes.js"
import movieRouter from "./routes/movieRoutes.js"
import userRouter from "./routes/authRoutes.js"

dotenv.config()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const app = express()
app.use(express.json())
app.use(morgan('dev'))



app.get('/', (req, res) => {
    res.status(200).send('Hello from movies API')
})


// app.use('/api/v1/movies', router);
app.use('/api/v1/movies', movieRouter);

app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Can't find ${req.originalUrl} on this server`
    // })
   const err = new Error(`Can't find ${req.originalUrl} on this server`)
   err.statusCode = 404
   err.status = "fail"

   next(err)
})

// global error handling middleware
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || "fail"

    res.status(err.statusCode).send({
        status: err.status,
        message: err.message
    })

    next()
})

const connectDB = () => {
    try {
        mongoose.connect(MONGO_URI).then(() => {
            console.log('Connected to database successfully: ', MONGO_URI);
            app.listen(PORT, () => {
                console.log(`App is running on http://localhost:${PORT}`);
            })
        })
    } catch (error) {
        process.exit(1)
    }
}

connectDB()