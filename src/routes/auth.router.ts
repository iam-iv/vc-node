import { Router } from "express";
import { authController } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/signup", authController.signUp);
authRouter.post("/login", authController.logIn);

export default authRouter;
