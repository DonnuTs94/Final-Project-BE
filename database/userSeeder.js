import bcrypt from "bcrypt"

import { prisma } from "../app/config/prisma.js"

const findRole = async () => {
  return await prisma.role.findMany()
}

const getRoleId = async (role) => {
  const roleData = await findRole()
  const foundRole = roleData.find((data) => data.name === role)

  return foundRole?.id
}

const main = async () => {
  try {
    await prisma.user.deleteMany()

    const hashPassword = await bcrypt.hash("Password123!", 10)

    const users = [
      // Admin user
      {
        email: "admin@example.com",
        password: hashPassword,
        firstName: "Admin",
        lastName: "User",
        address: "Admin Address",
        roleId: await getRoleId("admin"),
      },
      // Regular users
      {
        email: "user1@example.com",
        password: hashPassword,
        firstName: "Regular",
        lastName: "User 1",
        address: "User Address 1",
        roleId: await getRoleId("user"),
      },
      {
        email: "user2@example.com",
        password: hashPassword,
        firstName: "Regular",
        lastName: "User 2",
        address: "User Address 2",
        roleId: await getRoleId("user"),
      },
      {
        email: "user3@example.com",
        password: hashPassword,
        firstName: "Regular",
        lastName: "User 3",
        address: "User Address 3",
        roleId: await getRoleId("user"),
      },
      {
        email: "user4@example.com",
        password: hashPassword,
        firstName: "Regular",
        lastName: "User 4",
        address: "User Address 4",
        roleId: await getRoleId("user"),
      },
      {
        email: "user5@example.com",
        password: hashPassword,
        firstName: "Regular",
        lastName: "User 5",
        address: "User Address 5",
        roleId: await getRoleId("user"),
      },
    ]

    await prisma.user.createMany({ data: users })

    console.log("Users created successfully.")
  } catch (error) {
    console.error("Error creating users:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
