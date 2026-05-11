import express from "express"
import { getKategori } from "../controller/kategoriController.js"

const kategoriRouter = express.Router()

kategoriRouter.get("/", getKategori)

export default kategoriRouter