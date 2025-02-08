import express from "express"
import dotenv from "dotenv"
dotenv.config()
import router from "./routes/moviesRoute.js"
const app = express()
app.use(express.json())


const requestedDate = (req, res, next) => {
    req.requestedAt = new Date().toISOString();
    next()
}
// console.log(app.get('env'));
console.log(process.env.NODE_ENV);


app.use(requestedDate)
const PORT = process.env.PORT

app.use(express.static('./public'))

app.get("/", (req, res) => {
    res.status(200).send("Hello from movies API")
})

if(process.env.NODE_ENV === 'development'){
    console.log('App is running on development environment');
} else {
    console.log('App is running on production environment');
}


app.use("/api/v1/movies", router)


try {
    app.listen(PORT, () => {
        console.log(`App running on localhost:${PORT}`);
    })
} catch (error) {
    console.log(error);
}

