import express from "express";
import { deleteLaporan, getLaporan, getLaporanById } from "../controller/laporanController.js"
import { createLaporan } from "../controller/laporanController.js"
import { upload } from "../middleware/upload.js";

const laporanRouter = express.Router()

laporanRouter.get("/", getLaporan)
laporanRouter.post("/", upload.single("image"), createLaporan)
laporanRouter.delete("/:id", deleteLaporan)
laporanRouter.get("/:id", getLaporanById)


export default laporanRouter