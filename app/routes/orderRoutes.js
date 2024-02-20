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

router.get(
  "/users",
  validateToken,
  authorizationPermission(Permission.BROWSE_ORDERS),
  orderController.getOrdersByUserId
)

router.get(
  "/admin",
  validateToken,
  authorizationPermission(Permission.ADMIN_BROWSE_ORDERS),
  orderController.getAllAdminOrders
)

router.get(
  "/users/:id",
  validateToken,
  authorizationPermission(Permission.READ_ORDER),
  orderController.getOrderById
)

router.get(
  "/admin/:id",
  validateToken,
  authorizationPermission(Permission.ADMIN_READ_ORDER),
  orderController.getAdminOrderById
)

export default router
