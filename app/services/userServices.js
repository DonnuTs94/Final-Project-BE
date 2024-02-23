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

const createUser = async (firstName, lastName, email, password, address, roleId) => {
  return await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password,
      address,
      roleId
    }
  })
}

const editUser = async (userId, firstName, lastName, address) => {
  return await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      firstName,
      lastName,
      address
    }
  })
}
const findRole = async () => {
  return await prisma.role.findMany()
}

export { getUsers, findUserByEmail, createUser, editUser, findRole }
