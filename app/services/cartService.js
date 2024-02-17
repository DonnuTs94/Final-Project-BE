import { prisma } from "../config/prisma.js"
import { findProductbyId } from "./productService.js"

const getCartbyUserId = async (userId) => {
  return await prisma.cart.findMany({ where: { userId } })
}
const getCartbyUserIdAndProductId = async (userId, productId) => {
  return await prisma.cart.findFirst({
    where: {
      userId,
      productId
    },
    include: {
      Product: true
    }
  })
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

const updateCartQuantity = async (cartId, quantity, total) => {
  return await prisma.cart.update({
    where: {
      id: cartId
    },
    data: {
      quantity,
      total
    }
  })
}

const deleteItemInCart = async (id) => {
  return await prisma.cart.delete({
    where: {
      id
    }
  })
}

export {
  getCartbyUserId,
  createCart,
  updateCartQuantity,
  getCartbyUserIdAndProductId,
  deleteItemInCart
}
