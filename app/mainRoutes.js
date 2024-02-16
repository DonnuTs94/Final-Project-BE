import { Router } from "express"
import authRoutes from "./routes/authRoutes.js"
import categoryRoutes from "./routes/categoryRouter.js"
import productRoutes from "./routes/productRoutes.js"

const router = Router()

router.use("/auth", authRoutes)
router.use("/categories", categoryRoutes)
router.use("/product", productRoutes)

export default router
