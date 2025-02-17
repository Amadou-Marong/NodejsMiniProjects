import express from "express"
import { User } from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const signUp = async (req, res) => {
    try {
        const newUser = req.body
        const user = await User.create(newUser)
        
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        })

        return res.status(201).send({
            status: "success",
            token,
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
                const token = jwt.sign({
                    id: user._id
                }, process.env.JWT_SECRET, {
                    expiresIn: "1d"
                })
                return res.status(200).send({
                    status: "success",
                    token,
                    data: user
                })
            }
        }
        return res.status(400).send({
            status: "error",
            message: "Invalid email or password"
        })
    }catch(error){
        return res.status(500).send({
            status: "error",
            message: error
        })
    }
}

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.id)
        
        if(!user) {
            return res.status(401).send({
                status: "error",
                message: "Unauthorized"
            })
        }
        next()
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: error
        })
    }
}