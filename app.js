// const express = require('express')
import express from "express"
import userRouter from "./routes/usersRoutes.js"
import authRouter from "./routes/authRoutes.js"
import { jwtMiddleware } from "./middleware/authMiddleware.js"
const app = express()
const port = 3000

app.use(express.json())

app.use("/api/login", authRouter)
app.use(jwtMiddleware)
app.use("/api/users", userRouter)
app.use("/api/create", userRouter)
app.use("/api/update", userRouter)
app.use("/api/delete", userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
