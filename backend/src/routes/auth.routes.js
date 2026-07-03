import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";

const authRouter = Router();

/**
 * POST /api/auth/register
 */
authRouter.post("/register", authController.register)

/**
 * GET /api/auth/get-me
 */
authRouter.get("/get-me", authController.getMe)

/**
 * POST /api/auth/login
 */
authRouter.post("/login", authController.login)

/**
 * POST /api/auth/logout
 */
authRouter.post("/logout", authController.logout);

export default authRouter;