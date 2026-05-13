import express from "express"
import { createKomentar, deleteKomentar, getKomentar } from "../controller/komentarController.js"

const komentarRouter = express.Router()

komentarRouter.get("/", getKomentar)
komentarRouter.post("/", createKomentar)
komentarRouter.delete("/:id", deleteKomentar)

export default komentarRouter