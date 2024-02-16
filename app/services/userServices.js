import { prisma } from "../config/prisma.js";

export const getUsers = async () => {
  return await prisma.user.findMany();
};

export const findUserByEmail = async (email) => {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
};

export const createUser = async (
  firstName,
  lastName,
  email,
  password,
  address
) => {
  return await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password,
      address,
    },
  });
};

export const editUser = async (userId, firstName, lastName, address) => {
  return await prisma.user.update({
    where: {
      id: userId,

    },
    data: {
      firstName,
      lastName,
      address,
    },
  });
};
