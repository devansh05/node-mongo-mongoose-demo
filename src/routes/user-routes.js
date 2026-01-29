import express from "express";
import {
  getAllUsers,
  createNewUser,
  loginUser,
} from "../controller/user-controller.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/", createNewUser);
userRouter.get("/login", loginUser);

export { userRouter };
