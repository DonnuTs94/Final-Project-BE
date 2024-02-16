import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const findCategoryId = async () => {
  const categoryData = await prisma.category.findMany()

  const findCategoryId = categoryData.map((id) => {
    return id.id
  })

  return findCategoryId
}

const main = async () => {
  try {
    const categoryIds = await findCategoryId()

    const products = []
    for (let i = 1; i <= 5; i++) {
      const randomIndex = Math.floor(Math.random() * categoryIds.length)
      const categoryId = categoryIds[randomIndex]
      const product = {
        name: `Product ${i} `,
        price: 10.99 + i,
        description: `Description for Product ${i}`,
        quantity: 100,
        categoryId: categoryId
      }
      products.push(product)
    }

    // Create products for each seller
    const productIds = []
    for (const product of products) {
      const createdProduct = await prisma.product.create({
        data: product
      })
      productIds.push(createdProduct.id)
    }

    // Create product images using the extracted product IDs
    const productImagesData = productIds
      .map((productId) => {
        return [
          { imageUrl: `images/${productId}/1.jpg`, productId },
          { imageUrl: `images/${productId}/2.jpg`, productId },
          { imageUrl: `images/${productId}/3.jpg`, productId }
        ]
      })
      .flat()

    await prisma.productImage.createMany({
      data: productImagesData
    })

    console.log("Products and product images created successfully.")
  } catch (error) {
    console.error("Error creating products and product images:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
