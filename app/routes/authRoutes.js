import { Router } from "express"
import authController from "../controllers/authController.js"
import { validateLoginRequestBody } from "../middlewares/loginMiddleware.js"

const router = Router()

router.post("/login", validateLoginRequestBody, authController.login)

export default router
