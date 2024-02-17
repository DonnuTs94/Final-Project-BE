import { prisma } from "../config/prisma.js"

const createDataProduct = async (name, quantity, price, description, categoryId) => {
  return await prisma.product.create({
    data: {
      name: name,
      quantity: quantity,
      price: price,
      description: description,
      categoryId: categoryId
    }
  })
}

const findProductbyId = async (id) => {
  return await prisma.product.findUnique({ where: { id } })
}

const findAllProduct = async (product, category, pageSize, offset) => {
  return await prisma.product.findMany({
    take: pageSize,
    skip: offset,
    where: {
      name: {
        contains: product
      },
      ...(category ? { categoryId: category } : {})
    },
    include: {
      Category: {
        select: {
          name: true
        }
      },
      productImages: {
        select: {
          imageUrl: true
        }
      }
    }
  })
}

const countProductData = async (product, category) => {
  return await prisma.product.count({
    where: {
      name: {
        contains: product
      },
      ...(category ? { categoryId: category } : {})
    }
  })
}

export { createDataProduct, findProductbyId, findAllProduct, countProductData }
