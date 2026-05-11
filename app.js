// const express = require('express')
import express from "express"
import userRouter from "./routes/usersRoutes.js"
import authRouter from "./routes/authRoutes.js"
import laporanRouter from "./routes/laporanRoutes.js"
import { jwtMiddleware } from "./middleware/authMiddleware.js"
import path from "path"
import { fileURLToPath } from "url"
import cors from "cors"
import kategoriRouter from "./routes/kategoriRoutes.js"
import komentarRouter from "./routes/komentarRoutes.js"

const app = express()
const port = 5000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors())
app.use(express.json())

app.use("/api/login", authRouter)
app.use("/api/register", userRouter)
app.use("/api/kategori", kategoriRouter)
app.use("/api/komentar", jwtMiddleware, komentarRouter)

app.use("/api/users", jwtMiddleware, userRouter)
app.use("/api/laporan", jwtMiddleware, laporanRouter)

app.use("/gambar", express.static(path.join(__dirname, "image")));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
