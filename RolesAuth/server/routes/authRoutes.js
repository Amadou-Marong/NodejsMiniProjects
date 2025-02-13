import express from "express"

import { registerUser, loginUser, getUsers, managerUsers } from "../controllers/authController.js"
import { verifyToken } from "../middlewares/verifyToken.js"
import { authorizeRoles } from "../middlewares/authorizeRoles.js"

const authRouter = express.Router()

authRouter.route("/register").post(registerUser)
authRouter.route("/login").post(loginUser)
authRouter.route("/logout").post(verifyToken, loginUser)
authRouter.route("/users").get(verifyToken, authorizeRoles("admin"), getUsers)
authRouter.route("/managers").get(verifyToken, authorizeRoles("admin", "manager"), managerUsers)


export default authRouter

