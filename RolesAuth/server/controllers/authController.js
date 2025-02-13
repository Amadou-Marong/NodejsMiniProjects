import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
    try {
        const {name, email, password, role} = req.body
        const user = await User.findOne({email: email})
        if (user) {
            return res.status(400).send({
                message: "User with this email already exists"
            })
        }
        const salt = await bcrypt.genSalt(10)
        let hasPassword = await bcrypt.hash(password, salt)
        
        let userData = new User({
            name,
            email,
            password: hasPassword,
            role
        })

        userData.save()

        return res.status(201).send({
            message: "User Registered Successfully",
            data: userData
        })
    } catch (error) {
        return res.status(500).send({
            message: "Failed to Register user",
            data: error
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email: email})
        const match = await bcrypt.compare(password, user.password)

        if(!user || !match) {
            return res.status(200).send({
                message: "Invalid Email or Password"
            })
        }
        
    } catch (error) {
        
    }
}

export const logoutUser = async (req, res) => {
    return res.status(200).send("Logout User")
}