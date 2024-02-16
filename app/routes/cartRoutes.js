import express from "express"
import cartControllers from "../controllers/cartControllers.js"
import { validateToken } from "../middlewares/authMiddleware.js"
import { authorizationPermission } from "../middlewares/authorizationMiddleware.js"
import { Permission } from "../constants/authorization.js"

const router = express.Router()

router.get(
  "/",
  validateToken,
  authorizationPermission(Permission.BROWSE_CARTS),
  cartControllers.getCartbyUserId
)

router.post(
  "/create",
  validateToken,
  authorizationPermission(Permission.ADD_CART),
  cartControllers.createCart
)

export default router
