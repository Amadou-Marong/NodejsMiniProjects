import jwt from "jsonwebtoken"
import redisClient from "../config/redisClient.js"

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if(authHeader && authHeader.startsWith("Bearer ")){
        const token = authHeader.split(" ")[1]

        // check if token is blacklisted in redis client
        // let isBlacklisted = redisClient.get(token)
        // if(isBlacklisted) {
        //     return res.status(403).send({
        //         status: "forbidden",
        //         message: "Token is blacklisted"
        //     })
        // }

        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if(err){
                return res.status(403).send({
                    status: "forbidden",
                    message: "Invalid Token"
                })
            }
            req.user = payload
            next()
        })       
    } else {
        res.status(401).send({
            status: "unauthorized",
            message: "No token provided"
        })
    }
}