import { prisma } from "../config/prisma.js"

const createMultipleImages = async (productImagesData) => {
  return await prisma.productImage.createMany({
    data: productImagesData
  })
}

export { createMultipleImages }
