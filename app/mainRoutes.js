import { Router } from "express";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRouter.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);

export default router;
