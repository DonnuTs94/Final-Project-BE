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

const createUser = async (firstName, lastName, email, password, address) => {
  return await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password,
      address
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

export{getUsers,findUserByEmail,createUser,editUser}