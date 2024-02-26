import { PrismaClient } from "@prisma/client"
import fs from "fs"
import path from "path"

const prisma = new PrismaClient()

const findCategoryId = async () => {
  const categoryData = await prisma.category.findMany()
  return categoryData.map((category) => category.id)
}

const main = async () => {
  try {
    const categoryIds = await findCategoryId()
    const totalImages = 3 // Total number of images available

    // Create dummy products
    const products = []
    for (let i = 1; i <= 20; i++) {
      const randomIndex = Math.floor(Math.random() * categoryIds.length)
      const categoryId = categoryIds[randomIndex]

      // Create product
      const product = {
        name: `Product ${i}`,
        price: 1000000 + i,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
        quantity: 100,
        categoryId: categoryId // Assign category to product
      }
      products.push(product)
    }

    const productIds = []
    for (const product of products) {
      const createdProduct = await prisma.product.create({
        data: product
      })
      productIds.push(createdProduct.id)
    }

    // Create product images data based on the product IDs and available images
    const productImagesData = productIds.flatMap((productId) => {
      const imagesForProduct = []
      for (let i = 1; i <= totalImages; i++) {
        const imageName = `image${i}.jpg`
        const imageUrl = `${imageName}`
        imagesForProduct.push({
          imageUrl: imageUrl,
          productId: productId
        })
      }
      return imagesForProduct
    })

    // Create product images in the database
    await prisma.productImage.createMany({
      data: productImagesData
    })

    if (!fs.existsSync("./public")) {
      fs.mkdirSync("./public", { recursive: true })
    }

    for (let i = 1; i <= totalImages; i++) {
      const imageName = `image${i}.jpg`
      const sourceImagePath = path.join("database/imagesData", imageName) // Adjusted path
      const targetImagePath = path.join("public", imageName)

      // Copy image file
      fs.copyFileSync(sourceImagePath, targetImagePath)
    }

    console.log("Dummy products and product images created successfully.")
  } catch (error) {
    console.error("Error creating dummy products and product images:", error)
  } finally {
    await prisma.$disconnect()
  }
}

// Call the main function
main()
