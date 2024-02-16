import { Router } from "express";
import userController from "../controllers/userController.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import { validateRegisterRequestBody } from "../middlewares/registerMiddlewares.js";

const router = Router();

router.post("/register", validateRegisterRequestBody, userController.register);
router.put("/edit", validateToken, userController.updateUser);

export default router;
