import { prisma } from "../config/prisma.js"
import { findProductbyId } from "./productService.js"

const getCartbyUserId = async (userId) => {
  return await prisma.cart.findMany({ where: { userId } })
}

const createCart = async ({ quantity, productId }, userId) => {
  const product = await findProductbyId(productId)

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

export { getCartbyUserId, createCart }
