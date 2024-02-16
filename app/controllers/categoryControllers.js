import {
  getAllCategories,
  createCategory,
  updateCategory,
  hardDeleteCategory,
  softDeleteCategory,
} from "../services/categoryService.js";

const categoriesController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await getAllCategories();
      res
        .status(200)
        .json({ message: "Success Get All Categories", data: categories });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed Get All Categories", error: error });
    }
  },

  createCategory: async (req, res) => {
    try {
      const category = req.body;
      const newCategory = await createCategory(category);
      res
        .status(201)
        .json({ message: "Success Create Category", data: newCategory });
    } catch (error) {
      res.status(500).json({ message: "Failed Create Category", error: error });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = req.body;
      const updatedCategory = await updateCategory(Number(id), category);
      res
        .status(200)
        .json({ message: "Success Update Category", data: updatedCategory });
    } catch (error) {
      res.status(500).json({ message: "Failed Update Category", error: error });
    }
  },

  hardDeleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      await hardDeleteCategory(Number(id));
      res.status(200).json({ message: "Success Delete Category" });
    } catch (error) {
      res.status(500).json({ message: "Failed Delete Category" });
    }
  },

  softDeleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      await softDeleteCategory(Number(id));
      res.status(200).json({
        message: "Success Soft Delete Category",
      });
    } catch (error) {
      res.status(500).json({ message: "Failed Soft Delete Category" });
    }
  },
};

export default categoriesController;
