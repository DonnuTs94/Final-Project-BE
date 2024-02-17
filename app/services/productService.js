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

const findProductById = async (id) => {
  return await prisma.product.findFirst({
    where: {
      id,
      isDeleted: false
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

const findAllProduct = async (product, category, pageSize, offset) => {
  return await prisma.product.findMany({
    take: pageSize,
    skip: offset,
    where: {
      name: {
        contains: product
      },
      isDeleted: false,
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
    },
    orderBy: {
      name: "asc"
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

const softDeleteProduct = async (id) => {
  return await prisma.product.update({
    where: {
      id
    },
    data: {
      isDeleted: true
    }
  })
}

export {
  createDataProduct,
  findProductById,
  findAllProduct,
  countProductData,
  softDeleteProduct
}
