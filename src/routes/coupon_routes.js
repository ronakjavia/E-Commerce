import { Router } from "express";
import AuthRoles from "../utils/authRoles";
import { isLoggedIn, authorize } from "../middlewares/auth_middleware";
import {createCoupon, getAllCoupon, updateCoupon, deleteCoupon } from "../controller/coupon_controller"

const router = Router()

router.post("/", isLoggedIn, authorize(AuthRoles.ADMIN), createCoupon)
router.delete("/:id",  isLoggedIn, authorize(AuthRoles.ADMIN, AuthRoles.MODERATOR), deleteCoupon)
router.put("/action/:id", isLoggedIn, authorize(AuthRoles.ADMIN, AuthRoles.MODERATOR), updateCoupon)

router.get("/", isLoggedIn, authorize(AuthRoles.ADMIN, AuthRoles.MODERATOR), getAllCoupon)

export default router