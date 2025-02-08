import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


import { Movie } from "../models/movieModel.js";

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ Connected to MongoDB");
}).catch((error) => {
    console.error("❌ MongoDB Connection Error:", error);
});

// ✅ Correct file path
// const filePath = path.resolve("movies.json");

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct file path
const filePath = path.resolve(__dirname, "movies.json");


if (!fs.existsSync(filePath)) {
    console.error("❌ movies.json file not found");
    process.exit(1);
}

const movies = JSON.parse(fs.readFileSync(filePath, "utf-8"));


const importMovies = async () => {
    try {
        await Movie.insertMany(movies, { ordered: false });  // Avoid duplicate errors
        console.log("✅ Movies data imported successfully");
        process.exit();
    } catch (error) {
        console.error("❌ Error importing movies data:", error);
        process.exit(1);
    }
};

// ✅ Await the function call
if (process.argv.includes("--import")) {
    await importMovies();
}

// with this command: node import-data.js --import	
// it will import the data from movies.json	