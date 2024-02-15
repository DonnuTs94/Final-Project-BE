import * as categoryService from "../services/categoryService.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res
      .status(200)
      .json({ message: "Success Get All Categories", data: categories });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed Get All Categories", error: error });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(Number(id));
    res
      .status(200)
      .json({ message: "Success Get Category By Id", data: category });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed Get Category By Id", error: error });
  }
};

export const createCategory = async (req, res) => {
  try {
    const category = req.body;
    const newCategory = await categoryService.createCategory(category);
    res
      .status(201)
      .json({ message: "Success Create Category", data: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Failed Create Category", error: error });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = req.body;
    const updatedCategory = await categoryService.updateCategory(
      Number(id),
      category
    );
    res
      .status(200)
      .json({ message: "Success Update Category", data: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: "Failed Update Category", error: error });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await categoryService.deleteCategory(Number(id));
    res
      .status(200)
      .json({ message: "Success Delete Category", data: deletedCategory });
  } catch (error) {
    res.status(500).json({ message: "Failed Delete Category", error: error });
  }
};
