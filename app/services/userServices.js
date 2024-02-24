import { prisma } from "../config/prisma.js"

const getUsers = async () => {
  return await prisma.user.findMany({
    include: {
      Role: {
        select: {
          name: true
        }
      }
    }
  })
}

const findUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      address: true,
      Role: true
    }
  })
}

const findUserByEmail = async (email) => {
  return await prisma.user.findFirst({
    where: {
      email
    },
    include: {
      Role: true
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

export { getUsers, findUserById, findUserByEmail, createUser, editUser, findRole }
