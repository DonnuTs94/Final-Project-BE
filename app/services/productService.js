import { prisma } from "../config/prisma.js"

const findProductbyId = async (id) => {
  return await prisma.product.findUnique({ where: { id } })
}

export { findProductbyId }
