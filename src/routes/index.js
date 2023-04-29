import { Router } from "express";
import authRoutes from "./auth_routes.js";

const router = Router()
router.use("/auth", authRoutes) // -> /auth/login

export default router