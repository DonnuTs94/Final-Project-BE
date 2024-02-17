import { prisma } from "../config/prisma.js"

const createMultipleImages = async (productImagesData) => {
  return await prisma.productImage.createMany({
    data: productImagesData
  })
}

const getImageCountByProductId = async (productId) => {
  return await prisma.productImage.count({
    where: {
      productId: Number(productId)
    }
  })
}

const createProductImage = async (imageUrl, productId) => {
  return await prisma.productImage.create({
    data: {
      imageUrl,
      productId
    }
  })
}

const getImageById = async (imageId) => {
  return await prisma.productImage.findFirst({
    where: {
      id: imageId
    }
  })
}

const deleteImageById = async (imageId) => {
  return await prisma.productImage.delete({
    where: {
      id: imageId
    }
  })
}
export {
  createMultipleImages,
  getImageCountByProductId,
  createProductImage,
  getImageById,
  deleteImageById
}
