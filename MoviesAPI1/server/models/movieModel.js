import mongoose from "mongoose" 

const MovieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Description is required!"],
        trim: true  
    },
    duration: {
        type: Number,
        required: [true, "Duration is required!"]
    },
    rating: {
        type: Number,
        default: 1.0,
        min: 1.0,
        max: 5.0
    },
    totalRatings: {
        type: Number,
        default: 0
    },
    releasedYear: {
        type: Number,
        required: [true, "Released year is required!"]
    },
    releasedDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    genres: {
        type: [String],
        required: [true, "Genres is a required field!"]
    },
    directors: {
        type: [String],
        required: [true, "Directors is a required field!"]
    },
    coverImage: {
        type: String, // Assuming one cover image per movie
        required: [true, "Cover image is a required field!"]
    },
    actors: {
        type: [String],
        required: [true, "Actors field is required!"]
    },
    price: {
        type: Number,
        default: 0
    }
});

export const Movie = mongoose.model("Movie", MovieSchema);
