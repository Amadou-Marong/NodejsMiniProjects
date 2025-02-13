import { User } from "../models/userModel.js";


export const registerUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        return res.status(201).send({
            message: "User created successfully",
            data: user
        })
    } catch (error) {
        return res.status(500).send({
            message: "Failed to create user",
            data: error
        })
    }
}

export const loginUser = async (req, res) => {
    return res.status(200).send("Login User")
}

export const logoutUser = async (req, res) => {
    return res.status(200).send("Logout User")
}