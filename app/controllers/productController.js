import { prisma } from "../config/prisma.js"
import { createMultipleImages } from "../services/productImageService.js"
import {
  countProductData,
  createDataProduct,
  findAllProduct
} from "../services/productService.js"

const productController = {
  createProduct: async (req, res) => {
    const { name, price, description, quantity, categoryId } = req.body

    try {
      await prisma.$transaction(async () => {
        const files = req.files
        let imagePath = []

        const createProductData = await createDataProduct(
          name,
          Number(quantity),
          Number(price),
          description,
          Number(categoryId)
        )

        if (files.length > 0) {
          imagePath = files.map((file) => file.filename)
          const productImageData = imagePath.map((item) => {
            return {
              imageUrl: item,
              productId: createProductData.id
            }
          })

          await createMultipleImages(productImageData)
        }
      })

      return res.status(200).json({
        message: "Success create new product"
      })
    } catch (err) {
      return res.status(500).json({
        message: "Internal server error"
      })
    }
  },
  getAllProduct: async (req, res) => {
    try {
      const { product, category, page } = req.query

      const pageNumber = page ? parseInt(page, 10) : 1

      if (isNaN(pageNumber) || pageNumber < 1) {
        return res.status(400).json({
          message: "Invalid page number: Page must be a positive integer"
        })
      }
      const pageSize = 10
      const offset = (pageNumber - 1) * Number(pageSize)

      const productData = await findAllProduct(
        product,
        Number(category),
        pageSize,
        offset
      )

      const totalData = await countProductData(product, Number(category))
      const totalPages = Math.ceil(totalData / pageSize)

      return res.status(200).json({
        message: "Success get all product data!",
        data: productData,
        currentPage: pageNumber,
        totalPages: totalPages
      })
    } catch (err) {
      return res.status(500).json({
        message: "Internal server error"
      })
    }
  }
}

export default productController
