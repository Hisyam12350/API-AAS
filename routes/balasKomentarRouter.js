import express from "express"
import { createBalasKomentar, deleteBalasKomentar, getBalasKomentar } from "../controller/balasKomentarController.js"

const balasKomentarRouter = express.Router()

balasKomentarRouter.get("/", getBalasKomentar)
balasKomentarRouter.post("/", createBalasKomentar)
balasKomentarRouter.delete("/:id", deleteBalasKomentar)
export default balasKomentarRouter