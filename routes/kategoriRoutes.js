import express from "express"
import { createKategori, createRequest, deleteKategori, getAllRequest, getKategori, updateRequest } from "../controller/kategoriController.js"
import { adminOnly, superAdminOnly } from "../middleware/authRole.js"
const kategoriRouter = express.Router()

kategoriRouter.get("/", getKategori)
kategoriRouter.get("/get-request", superAdminOnly, getAllRequest)
kategoriRouter.post("/create-category", superAdminOnly, createKategori)
kategoriRouter.post("/", adminOnly, createRequest)
kategoriRouter.delete("/:id", superAdminOnly, deleteKategori)
kategoriRouter.put("/:id", superAdminOnly, updateRequest)
export default kategoriRouter