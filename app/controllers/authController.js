import { createToken } from "../helpers/token.js";
import bcrypt from "bcrypt";

import { prisma } from "../config/prisma.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, address } = req.body;
    const userAlreadyExist = await prisma.user.findFirst({ where: { email } });

    if (userAlreadyExist) {
      throw new Error("User already exists");
    }

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, 10),
        address,
      },
    });
    console.log(user);
    res.status(200).json({
      message: "Register Success",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: "err",
    });
  }
};

export const login = async (req, res) => {
  try {
    if (req.user !== undefined) {
      const { userId, roleId } = req.user;
      const token = createToken({ userId, roleId });

      res.status(200).json({
        message: "Login Success",
        token,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
