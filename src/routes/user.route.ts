import { Router } from "express";
import { createUserController, deleteUserController, getAllUsersController, getUserController, loginUserController, updateUserController } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/signup", createUserController);
userRouter.post("/login", loginUserController);
userRouter.get("/all", getAllUsersController);
userRouter.get("/:id", getUserController);
userRouter.patch("/", updateUserController);
userRouter.delete("/:id", deleteUserController);

export default userRouter;