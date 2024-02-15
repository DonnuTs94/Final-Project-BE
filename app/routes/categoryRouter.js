import express from "express";
import * as categoryControllers from "../controllers/categoryControllers.js";

const router = express.Router();

router.get("/categories", categoryControllers.getAllCategories);
router.get("/categories/:id", categoryControllers.getCategoryById);
router.post("/categories", categoryControllers.createCategory);
router.put("/categories/:id", categoryControllers.updateCategory);
router.delete("/categories/:id", categoryControllers.deleteCategory);

export default router;
