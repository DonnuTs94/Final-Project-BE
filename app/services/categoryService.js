import { prisma } from "../config/prisma.js"

const getAllCategories = async () => {
  return await prisma.category.findMany({
    where: {
      isDeleted: false
    }
  })
}

const createCategory = async (category) => {
  return await prisma.category.create({ data: category })
}

const updateCategory = async (id, category) => {
  return await prisma.category.update({
    where: { id },
    data: category
  })
}

const hardDeleteCategory = async (id) => {
  return await prisma.category.delete({ where: { id } })
}

const softDeleteCategory = async (id) => {
  return await prisma.category.update({
    where: { id },
    data: { isDeleted: true }
  })
}

const getCategoryById = async (id) => {
  return await prisma.category.findFirst({
    where: {
      id: id
    }
  })
}

export {
  getAllCategories,
  createCategory,
  updateCategory,
  hardDeleteCategory,
  softDeleteCategory,
  getCategoryById
}
