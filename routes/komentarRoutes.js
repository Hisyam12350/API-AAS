import express from "express"
import { createKomentar, getKomentar } from "../controller/komentarController.js"

const komentarRouter = express.Router()

komentarRouter.get("/", getKomentar)
komentarRouter.post("/", createKomentar)

export default komentarRouter