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

const connectDB = () => {
    try {
        mongoose.connect(MONGO_URI).then(() => {
            console.log('Connected to database successfully: ', MONGO_URI);
            app.listen(PORT, () => {
                console.log(`App is running on localhost:${PORT}`);
            })
        })
    } catch (error) {
        process.exit(1)
    }
}

connectDB()

app.get('/', (req, res) => {
    res.status(200).send('Hello from movies API')
})


app.use('/api/v1/movies', router);