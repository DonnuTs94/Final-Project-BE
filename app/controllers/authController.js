import { createToken } from "../helpers/token.js"
import { findUserByEmail } from "../services/userServices.js"
import bcrypt from "bcrypt"

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body

      const user = await findUserByEmail(email)

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        })
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({
          message: "Wrong password"
        })
      }

      const token = createToken({ userId: user.id, roleId: user.roleId })

      res.status(200).json({
        message: "Login Success",
        token
      })
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message
      })
    }
  }
}

export default authController
