import { Router } from "express"
import categoryRoutes from "./routes/categoryRouter.js"
import productRoutes from "./routes/productRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import shippingCostRoutes from "./routes/shippingCostRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import transactionRoutes from "./routes/transactionRoutes.js"

const router = Router()

router.use("/auth", authRoutes)
router.use("/user", userRoutes)
router.use("/categories", categoryRoutes)
router.use("/product", productRoutes)
router.use("/carts", cartRoutes)
router.use("/shippingCost", shippingCostRoutes)
router.use("/orders", orderRoutes)
router.use("/payment", transactionRoutes)

export default router
