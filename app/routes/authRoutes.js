import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import {
  validateLogin,
  validateLoginRequestBody,
} from "../middlewares/loginMiddleware.js";
import { validateRegisterRequestBody } from "../middlewares/registerMiddlewares.js";

const router = Router();

router.post("/login", validateLoginRequestBody, validateLogin, login);
router.post("/register", validateRegisterRequestBody, register);

export default router;
