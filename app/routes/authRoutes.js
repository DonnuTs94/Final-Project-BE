import { Router } from "express";
import { login } from "../controllers/authController.js";
import {
  validateLogin,
  validateLoginRequestBody,
} from "../middlewares/loginMiddleware.js";

const router = Router();

router.post("/login", validateLoginRequestBody, validateLogin, login);

export default router;
