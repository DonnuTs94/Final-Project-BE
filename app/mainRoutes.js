import { Router } from "express";
import authRoutes from "./routes/authRoutes.js";
import editUserRoutes from "./routes/editUserRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/auth", editUserRoutes);

export default router;
