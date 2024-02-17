import { Router } from "express"
import orderController from "../controllers/orderController.js"
import { validateToken } from "../middlewares/authMiddleware.js"
import { authorizationPermission } from "../middlewares/authorizationMiddleware.js"
import { Permission } from "../constants/authorization.js"
import { validateInputOrder } from "../middlewares/orderMiddleware.js"

const router = Router()

router.post(
  "/create",
  validateToken,
  authorizationPermission(Permission.ADD_ORDER),
  validateInputOrder,
  orderController.createOrder
)

export default router
