import { prisma } from "../config/prisma.js"

const findOrderItemFromOrderId = async (orderId) => {
  return await prisma.orderItem.findMany({
    where: {
      orderId
    }
  })
}

export { findOrderItemFromOrderId }
