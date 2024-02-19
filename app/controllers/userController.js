import { editUser, getUsers } from "../services/userServices.js"
import bcrypt from "bcrypt"
import { findUserByEmail } from "../services/userServices.js"
import { createUser } from "../services/userServices.js"
import dotenv from "dotenv"
import { getRoleId } from "../helpers/role.js"
import { Role } from "../constants/authorization.js"

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
      const BCRYPT_AROUND = process.env.BCRYPT_AROUND || 10

      if (userAlreadyExist) {
        return res.status(400).json({ message: "User already exists" })
      }
      const userId = await getRoleId(Role.USER)
      const roleId = Number(userId.id)
      const hashedPassword = bcrypt.hashSync(password, Number(BCRYPT_AROUND))
      const user = await createUser(
        firstName,
        lastName,
        email,
        hashedPassword,
        address,
        roleId
      )
      res.status(200).json({
        message: "Register Success",
        user
      })
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error"
      })
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await getUsers()

      res.json({
        message: "Get all users success",
        users
      })
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error"
      })
    }
  }
}
export default userController
