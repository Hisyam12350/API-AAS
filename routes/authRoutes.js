import express from "express"
import { gantiPassword, login } from "../controller/authController.js"

const authRouter = express.Router()

authRouter.post("/", login)
export default authRouter