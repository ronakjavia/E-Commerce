import { Router } from "express";
import { forgotPassword, getProfile, login, logout, resetPassword, signUp } from "../controller/auth_controller.js"
import { authorize, isLoggedIn} from "../middlewares/auth_middleware.js"
import AuthRoles from "../utils/authRoles.js";

const router = Router()

router.post("/signUp", signUp)
router.post("/login", login)
router.get("/logout", logout)

router.post("/password/forgot/", forgotPassword)
router.post("/password/reset/:token", resetPassword)

router.get("/profile", isLoggedIn, authorize(AuthRoles.ADMIN), getProfile) //access only for admin

export default router