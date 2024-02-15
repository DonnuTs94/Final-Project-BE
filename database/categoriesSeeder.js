import { prisma } from "../app/config/prisma.js"

const main = async () => {
  try {
    await prisma.category.deleteMany()

    const categories = ["Vga", "Ram", "Monitor", "Cpu", "Mouse"]

    for (const categoryName of categories) {
      await prisma.category.create({
        data: {
          name: categoryName,
        },
      })
      console.log(`Category "${categoryName}" created successfully.`)
    }

    console.log("All categories created successfully.")
  } catch (error) {
    console.error("Error creating categories:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
