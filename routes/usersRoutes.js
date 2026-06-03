import express from "express";
import {
  getUserById,
  getUsers,
  tambahGambarUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/usersController.js";
import { upload } from "../middleware/upload.js";
import { adminOnly, superAdminOnly } from "../middleware/authRole.js";
import { gantiPassword } from "../controller/authController.js";
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/", createUser);
userRouter.put("/edit/:id", upload.single("image"), tambahGambarUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", superAdminOnly, deleteUser);
userRouter.get("/:id", getUserById);
userRouter.put("/ganti-password/:id", gantiPassword);

export default userRouter;
