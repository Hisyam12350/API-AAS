import express from "express";
import {
  deleteLaporan,
  editStatus,
  getLaporan,
  getLaporanById,
  getLaporanByUser,
  updateLaporan,
  getTotalLaporan,
  getTotalLaporanByUser,
  getLaporanPerBulan,
} from "../controller/laporanController.js";
import { createLaporan } from "../controller/laporanController.js";
import { upload } from "../middleware/upload.js";
const laporanRouter = express.Router();

laporanRouter.get("/", getLaporan);
laporanRouter.get("/total", getTotalLaporan);
laporanRouter.get("/statistik", getLaporanPerBulan);
laporanRouter.get("/total/user/:id", getTotalLaporanByUser);
laporanRouter.post("/", upload.single("image"), createLaporan);
laporanRouter.put("/edit/:id", upload.single("image"), updateLaporan);
laporanRouter.delete("/:id", deleteLaporan);
laporanRouter.get("/user/:id", getLaporanByUser);
laporanRouter.get("/:id", getLaporanById);
laporanRouter.put("/:id", editStatus);

export default laporanRouter;
