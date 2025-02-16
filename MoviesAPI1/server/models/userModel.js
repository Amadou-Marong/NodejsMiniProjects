import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name field is required!"]
    },
    email: {
        type: String,
        required: [true, "The email field is required!"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email!"]
    },
    photo: String,
    password: {
        type: String,
        required: [true, "Password is required!"]
    },
    consfirmPassword: {
        type: String,
        required: [true, "Please confirm password!"],
        validate: {
            validator: function(val) {
                return val == this.password
            },
            message: "The confirm password and the password should be thesame"
        }
    }
})

export const User = mongoose.model("User", userSchema)