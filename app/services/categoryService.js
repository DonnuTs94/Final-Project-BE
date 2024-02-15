import prisma from "../config/prisma.js";

export const getAllCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

export const getCategoryById = async (id) => {
  const category = await prisma.category.findUnique({ where: { id } });
  return category;
};

export const createCategory = async (category) => {
  const newCategory = await prisma.category.create({ data: category });
  return newCategory;
};

export const updateCategory = async (id, category) => {
  const updatedCategory = await prisma.category.update({
    where: { id },
    data: category,
  });
  return updatedCategory;
};

export const deleteCategory = async (id) => {
  const deletedCategory = await prisma.category.delete({ where: { id } });
  return deletedCategory;
};
