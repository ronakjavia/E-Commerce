import { Router } from "express";
import { getProfile, login, logout, signUp } from "../controller/auth_controller.js"
import { authorize, isLoggedIn} from "../middlewares/auth_middleware.js"
import AuthRoles from "../utils/authRoles.js";

const router = Router()

router.post("/signUp", signUp)
router.post("/login", login)
router.get("/logout", logout)

router.get("/profile", isLoggedIn, authorize(AuthRoles.ADMIN), getProfile) //access only for admin

export default router