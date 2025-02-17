import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name field is required!"]
    },
    email: {
        type: String,
        required: [true, "The email field is required!"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please enter a valid email!"]
    },
    photo: String,
    password: {
        type: String,
        required: [true, "Password is required!"],
        minlength: 8
    },
    confirmPassword: {
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

userSchema.pre('save', function(next) {
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
    this.confirmPassword = undefined
    next()
})

export const User = mongoose.model("User", userSchema)