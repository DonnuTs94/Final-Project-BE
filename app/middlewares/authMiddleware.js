import jwt from "jsonwebtoken"
import { verifyToken } from "../helpers/token.js"

const { TokenExpiredError } = jwt

export const validateToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        message: "Unauthorized"
      })
    }

    const token = req.headers.authorization.split(" ")[1]

    const userData = verifyToken(token)
    req.user = userData
    next()
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({
        message: "Token has expired"
      })
    }

    next(err)
  }
}
