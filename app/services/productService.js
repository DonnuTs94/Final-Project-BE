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

export { createDataProduct }
