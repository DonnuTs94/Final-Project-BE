import { prisma } from "../config/prisma.js"
import { createMultipleImages } from "../services/productImageService.js"
import { createDataProduct } from "../services/productService.js"

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
  }
}

export default productController
