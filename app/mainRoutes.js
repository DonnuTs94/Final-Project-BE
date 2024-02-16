import { Router } from "express"
import authRoutes from "./routes/authRoutes.js"
import categoryRoutes from "./routes/categoryRouter.js"
import cartRoutes from "./routes/cartRoutes.js"

const router = Router()

router.use("/auth", authRoutes)
router.use("/categories", categoryRoutes)
router.use("/carts", cartRoutes)

export default router
