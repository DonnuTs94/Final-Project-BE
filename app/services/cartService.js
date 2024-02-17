import { prisma } from "../config/prisma.js"
import { findProductById } from "./productService.js"

const getCartByUserId = async (userId) => {
  return await prisma.cart.findMany({ where: { userId } })
}

const getCartsByCartIdUserId = async (cartId, userId) => {
  return await prisma.cart.findMany({
    where: {
      id: {
        in: cartId
      },
      userId
    },
    include: {
      Product: true
    }
  })
}

const createCart = async ({ quantity, productId }, userId) => {
  const product = await findProductById(productId)

  if (!product) {
    throw new Error("Product not found")
  }

  const existingCart = await prisma.cart.findFirst({
    where: {
      userId,
      productId
    }
  })

  if (existingCart) {
    const updatedQuantity = existingCart.quantity + quantity
    const total = updatedQuantity * product.price

    return await prisma.cart.update({
      where: {
        id: existingCart.id
      },
      data: {
        quantity: updatedQuantity,
        total
      }
    })
  } else {
    const total = quantity * product.price

    return await prisma.cart.create({
      data: {
        userId,
        quantity,
        total,
        productId
      }
    })
  }
}

export { getCartByUserId, getCartsByCartIdUserId, createCart }
