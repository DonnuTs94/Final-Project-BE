import express from "express"
import cartControllers from "../controllers/cartControllers.js"
import { validateToken } from "../middlewares/authMiddleware.js"
import { authorizationPermission } from "../middlewares/authorizationMiddleware.js"
import { Permission } from "../constants/authorization.js"
import {
  validateCartRequestBody,
  validateDeleteCart
} from "../middlewares/cartMiddleware.js"

const router = express.Router()

router.get(
  "/",
  validateToken,
  authorizationPermission(Permission.BROWSE_CARTS),
  cartControllers.getCartByUserId
)

router.post(
  "/create",
  validateToken,
  authorizationPermission(Permission.ADD_CART),
  validateCartRequestBody,
  cartControllers.createCart
)

router.put(
  "/update",
  validateToken,
  authorizationPermission(Permission.EDIT_CART),
  validateCartRequestBody,
  cartControllers.updateCart
)

router.delete(
  "/delete/:id",
  validateToken,
  authorizationPermission(Permission.DELETE_CART),
  validateDeleteCart,
  cartControllers.deleteCart
)
export default router
