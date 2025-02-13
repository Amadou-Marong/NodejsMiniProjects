import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        trim: true
    },
    role: {
        type: String,
        enum: ["user", "manager", "admin"],
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

export const User = mongoose.model("User", userSchema)