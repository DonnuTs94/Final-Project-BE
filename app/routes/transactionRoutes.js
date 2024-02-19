import { Router } from "express"
import validateTransaction from "../middlewares/transactionMiddleware.js"
import PostCreateTransaction from "../controllers/paymentController.js"

const router = Router()

router.post(
  "/transaction",
  validateTransaction("createTransaction"),
  PostCreateTransaction
)

export default router
