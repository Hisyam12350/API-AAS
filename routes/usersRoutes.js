import express from "express"
import { getUserById, getUsers } from "../controller/usersController.js"
import { createUser } from "../controller/usersController.js"
import { updateUser } from "../controller/usersController.js"
import { deleteUser } from "../controller/usersController.js"    

const userRouter = express.Router()

userRouter.get("/", getUsers)
userRouter.post("/", createUser)
userRouter.put("/:id", updateUser)
userRouter.delete("/:id", deleteUser)
userRouter.get("/:id", getUserById)

export default userRouter
