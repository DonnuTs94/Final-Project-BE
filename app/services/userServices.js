import { prisma } from "../config/prisma.js"
const getUsers = async () => {
  return await prisma.user.findMany()
}
const findUserByEmail = async (email) => {
  return await prisma.user.findFirst({
    where: {
      email
    }
  })
}

export { getUsers, findUserByEmail }
