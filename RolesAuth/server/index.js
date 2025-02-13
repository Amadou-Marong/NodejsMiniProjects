import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import morgan from "morgan"
import authRouter from "./routes/authRoutes.js"
dotenv.config()

const PORT=process.env.PORT
const MONGO_URI=process.env.MONGO_URI

const app = express()
app.use(express.json())

app.use(morgan('dev'))

app.get("/", (req, res) => {
    res.status(200).send("Hello from Auths API")
})

app.use("/api/v1/auth", authRouter)

const connectDB = async () => {
    mongoose.connect(MONGO_URI).then(() => {
        console.log('Connected to database successfully: ', MONGO_URI);
        app.listen(PORT, () => {
            console.log(`App is running on http://localhost:${PORT}`);
        })
    })
}

connectDB()



