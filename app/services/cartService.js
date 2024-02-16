import { prisma } from "../config/prisma.js"
import { findProductbyId } from "./productService.js"

const getCartbyUserId = async (userId) => {
  return await prisma.cart.findMany({ where: { userId } })
}

const createCart = async ({ quantity, productId }, userId) => {
  const product = await findProductbyId(productId)
  const total = quantity * product.price

  if (!product) {
    throw new Error("Product not found")
  }

  return await prisma.cart.create({
    data: {
      userId,
      quantity,
      total,
      productId
    }
  })
}

export { getCartbyUserId, createCart }
