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

export const signIn = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})

        if (user) {
            const match = await bcrypt.compare(password, user.password)
            
            if (match) {
                return res.status(200).send({
                    status: "success",
                    data: user
                })
            }
        }
    }catch(error){
        return res.status(500).send({
            status: "error",
            message: error
        })
    }
}