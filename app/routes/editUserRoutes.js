import { Router } from "express";
import { validateLoginRequestBody } from "../middlewares/loginMiddleware.js";
import { editUser } from "../controllers/editUser.js";

const router = Router();

router.put("/edit", validateLoginRequestBody, editUser);

export default router;
