import {Router} from "express"
import { generateOrder, generateRazorpayOrderId,getAllOrders,getMyOrders,updateOrderStatus } from "../controller/order_controller"
import {isLoggedIn, authorize} from "../middlewares/auth_middleware"
import AuthRoles from "../utils/authRoles"

const router = Router()

export default router