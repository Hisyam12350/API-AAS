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

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/", createUser);
userRouter.put("/edit/:id", upload.single("image"), tambahGambarUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.get("/:id", getUserById);

export default userRouter;
