import express from "express"
import { User } from "../models/userModel.js"

export const signUp = async (req, res) => {
    try {
        const newUser = req.body
        const user = await User.create(newUser)
        
        return res.status(201).send({
            status: "success",
            data: user
        })
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: error
        })
    }
}