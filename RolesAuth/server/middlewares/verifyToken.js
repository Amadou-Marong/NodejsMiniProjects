import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if(authHeader && authHeader.startsWith("Bearer ")){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if(err){
                return res.status(403).send({message: "Forbidden"})
            }
            req.user = user
            next()
        })       
    } else {
        res.status(401).send({message: "Unauthorized"})
    }
}