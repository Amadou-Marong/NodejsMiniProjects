import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import redisClient from "../config/redisClient.js"



export const registerUser = async (req, res) => {
    try {
        const {name, email, password, role} = req.body
        const existingUser = await User.findOne({email: email})
        if (existingUser) {
            return res.status(400).send({
                message: "User with this email already exists"
            })
        }
        const salt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(password, salt)

        // let hash = await bcrypt.hash(password, 10)
        
        let userData = new User({
            name,
            email,
            password: hashedPassword,
            role
        })

        await userData.save()

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
        const user = await User.findOne({email})

        if(!user) {
            return res.status(404).send({
                message: "Invalid Credentials"
            })
        }
        const match = await bcrypt.compare(password, user.password)
        
        if(!match){
            return res.status(400).send({
                message: "Invalid Credentials"
            })
        }
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        })

        return res.status(200).send({
            message: "Login Successfull",
            token
        })
    } catch (error) {
        return res.status(500).send({
            message: "Something went Wrong!"
        })
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        return res.status(200).send({
            status: "success",
            data: users
        })
    } catch (error) {
        return res.status(500).send({
            status: "failed",
            message: "Something went wrong"
        })
    }
}

export const managerUsers = async (req, res) => {
    try {
        const users = await User.find({role: "manager"})
        return res.status(200).send({
            status: "success",
            data: users
        })
    } catch (error) {
        return res.status(500).send({
            status: "failed",
            message: "Something went wrong"
        })
    }
}


export const logoutUser = async (req, res) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization
        if(authHeader && authHeader.startsWith("Bearer ")){
            const token = authHeader.split(" ")[1]
            
            // set token to with expiration
            await redisClient.set(token, "blacklisted", "EX", 86400);

            return res.status(200).send({
                message: "Logout Successfull"
            })
        } 
    } catch (error) {
        return res.status(500).send({
            message: "Something went wrong"
        })
    }
}