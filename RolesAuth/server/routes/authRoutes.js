import express from "express"

import { registerUser, loginUser, getUsers } from "../controllers/authController.js"
import { verifyToken } from "../middlewares/verifyToken.js"
import { authorizeRoles } from "../middlewares/authorizeRoles.js"

const authRouter = express.Router()

authRouter.route("/register").post(registerUser)
authRouter.route("/login").post(loginUser)
authRouter.route("/users").get(verifyToken, authorizeRoles("admin", "manager"), getUsers)


export default authRouter

