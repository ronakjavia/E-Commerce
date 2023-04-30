import { Router } from "express";
import AuthRoles from "../utils/authRoles.js";
import { authorize, isLoggedIn } from "../middlewares/auth_middleware.js";
import {createCollection, updateCollection, deleteCollection, getAllCollection} from "../controller/collection_controller.js"

const router = Router()

router.post("/", isLoggedIn, authorize(AuthRoles.ADMIN), createCollection)
router.put("/:id", isLoggedIn, authorize(AuthRoles.ADMIN), updateCollection)
router.delete("/:id", isLoggedIn, authorize(AuthRoles.ADMIN), deleteCollection)
router.get("/:id", isLoggedIn, authorize(AuthRoles.ADMIN), getAllCollection)

export default router