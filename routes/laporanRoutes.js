import express from "express";
import { deleteLaporan, editStatus, getLaporan, getLaporanById, updateLaporan } from "../controller/laporanController.js"
import { createLaporan } from "../controller/laporanController.js"
import { upload } from "../middleware/upload.js";

const laporanRouter = express.Router()

laporanRouter.get("/", getLaporan)
laporanRouter.post("/", upload.single("image"), createLaporan)
laporanRouter.put("/edit/:id", upload.single("image"), updateLaporan)
laporanRouter.delete("/:id", deleteLaporan)
laporanRouter.get("/:id", getLaporanById)
laporanRouter.put("/:id", editStatus)

export default laporanRouter