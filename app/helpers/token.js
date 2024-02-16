import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const createToken = (userData) => {
  const { id, roleId } = userData

  return jwt.sign({ id, roleId }, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_EXPIRES_IN}`
  })
}

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}
