import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const createToken = (userData) => {
  const { userId, roleId } = userData

  if (typeof userId !== "number" || typeof roleId !== "number") {
    throw new Error("UserId and roleId must be a number")
  }
  return jwt.sign({ userId, roleId }, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_EXPIRES_IN}`
  })
}

export const verifyToken = (token) => {
  if (typeof token !== "string") {
    throw new Error("Token must be a string")
  }
  return jwt.verify(token, process.env.JWT_SECRET)
}
