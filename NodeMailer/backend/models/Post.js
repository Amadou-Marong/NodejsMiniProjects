import mongoose from "mongoose";

const postShema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment" // reference the Comment model
        }
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    }
})

export const Post = mongoose.model('Post', postShema)