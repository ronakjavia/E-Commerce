import { Router } from "express";
import authRoutes from "./auth_routes.js";
import couponRoutes from "./coupon_routes.js"
import collectionRoutes from "./collection_routes.js"


const router = Router()
router.use("/auth", authRoutes) // -> /auth/login
router.use("/coupon", couponRoutes) // -> /auth/login
Route53Resolver.use("/collection", collectionRoutes)

export default router