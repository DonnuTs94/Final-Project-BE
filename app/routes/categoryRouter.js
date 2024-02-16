import express from "express";
import categoryControllers from "../controllers/categoryControllers.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import { authorizationPermission } from "../middlewares/authorizationMiddleware.js";
import { Permission } from "../constants/authorization.js";

const router = express.Router();

router.get("/", categoryControllers.getAllCategories);
router.post(
  "/create",
  validateToken,
  authorizationPermission(Permission.ADD_CATEGORY),
  categoryControllers.createCategory
);
router.put(
  "/update/:id",
  validateToken,
  authorizationPermission(Permission.EDIT_CATEGORY),
  categoryControllers.updateCategory
);
router.delete(
  "/harddelete/:id",
  validateToken,
  authorizationPermission(Permission.DELETE_CATEGORY),
  categoryControllers.hardDeleteCategory
);

router.delete(
  "/delete/:id",
  validateToken,
  authorizationPermission(Permission.DELETE_CATEGORY),
  categoryControllers.softDeleteCategory
);

export default router;
