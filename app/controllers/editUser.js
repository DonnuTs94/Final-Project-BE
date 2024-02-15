import { prisma } from "../config/prisma.js";
import { verifyToken } from "../helpers/token.js";
import bcrypt from "bcrypt";

export const editUser = async (req, res) => {
  try {
    const userId = verifyToken(req.headers.authorization).userId;

    const { firstName, lastName, email, password, address } = req.body;
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
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
      message: "Edited user success",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: "err",
    });
  }
};
