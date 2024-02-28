import { Router } from "express"
import PostCreateTransaction from "../controllers/paymentController.js"

const router = Router()

router.post("/transaction", PostCreateTransaction.createPayment)

export default router
