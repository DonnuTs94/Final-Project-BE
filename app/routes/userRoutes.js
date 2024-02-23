import { Router } from "express"
import userController from "../controllers/userController.js"
import { validateToken } from "../middlewares/authMiddleware.js"
import { validateRegisterRequestBody } from "../middlewares/registerMiddlewares.js"
import { authorizationPermission } from "../middlewares/authorizationMiddleware.js"
import { Permission } from "../constants/authorization.js"

const router = Router()

router.get(
  "/",
  validateToken,
  authorizationPermission(Permission.BROWSE_USERS),
  userController.getAllUsers
)

router.get("/profile", validateToken, userController.getProfile)

router.post("/register", validateRegisterRequestBody, userController.register)

router.put(
  "/edit",
  validateToken,
  authorizationPermission(Permission.EDIT_USER),
  userController.updateUser
)

export default router
