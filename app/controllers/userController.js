import { editUser } from "../services/userServices.js"
import bcrypt from "bcrypt"
import { findUserByEmail } from "../services/userServices.js"
import { createUser } from "../services/userServices.js"
import dotenv from "dotenv"

dotenv.config()

const userController = {
  updateUser: async (req, res) => {
    try {
      const { firstName, lastName, address } = req.body
      const userId = req.user.id

      const user = await editUser(userId, firstName, lastName, address)
      res.status(200).json({
        message: "Edited user success",
        user
      })
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error"
      })
    }
  },
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password, address } = req.body
      const userAlreadyExist = await findUserByEmail(email)
      const BCRYPT_AROUND = process.env.BCRYPT_AROUND

      if (userAlreadyExist) {
        return res.status(400).json({ message: "User already exists" })
      }
      const hashedPassword = bcrypt.hashSync(password, BCRYPT_AROUND)
      const user = await createUser(firstName, lastName, email, hashedPassword, address)
      res.status(200).json({
        message: "Register Success",
        user
      })
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error"
      })
    }
  }
}
export default userController
