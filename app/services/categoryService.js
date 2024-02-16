import { prisma } from "../config/prisma.js";

const getAllCategories = async () => {
  return await prisma.category.findMany();
};

const createCategory = async (category) => {
  return await prisma.category.create({ data: category });
};

const updateCategory = async (id, category) => {
  return await prisma.category.update({
    where: { id },
    data: category,
  });
};

const hardDeleteCategory = async (id) => {
  return await prisma.category.delete({ where: { id } });
};

const softDeleteCategory = async (id) => {
  return await prisma.category.update({
    where: { id },
    data: { isDeleted: true },
  });
};

export {
  getAllCategories,
  createCategory,
  updateCategory,
  hardDeleteCategory,
  softDeleteCategory,
};
