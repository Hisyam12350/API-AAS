import express from "express"
import { createKategori, getKategori } from "../controller/kategoriController.js"

const kategoriRouter = express.Router()

kategoriRouter.get("/", getKategori)
kategoriRouter.post("/", createKategori)
export default kategoriRouter