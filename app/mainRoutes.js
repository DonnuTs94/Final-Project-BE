import { Router } from "express"
import categoryRoutes from "./routes/categoryRouter.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"

const router = Router()

router.use("/auth", authRoutes)
router.use("/user", userRoutes)
router.use("/categories", categoryRoutes)
router.use("/carts", cartRoutes)

export default router
