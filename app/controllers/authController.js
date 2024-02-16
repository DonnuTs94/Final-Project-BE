import { createToken } from "../helpers/token.js";

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
