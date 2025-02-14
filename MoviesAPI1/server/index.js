import mongoose from "mongoose"
import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import router from "./routes/movieRoutes.js"
dotenv.config()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const app = express()
app.use(express.json())
app.use(morgan('dev'))



app.get('/', (req, res) => {
    res.status(200).send('Hello from movies API')
})


app.use('/api/v1/movies', router);

app.all('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server`
    })
})

// global error handling middleware
// app.use((err, req, res, next) => {
//     res.statusCode = err.statusCode || 500
//     res.status = err.status || "fail"
//     res.message = err.message

//     return res.status()
// })

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