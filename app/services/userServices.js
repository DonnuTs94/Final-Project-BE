import { prisma } from '../config/prisma.js';

export const getUsers = async () => {
  return await prisma.user.findMany();
};

export const findUser = async (email) => {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
};
