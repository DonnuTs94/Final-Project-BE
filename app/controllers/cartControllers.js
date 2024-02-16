import { getCartbyUserId, createCart } from "../services/cartService.js"

const cartsController = {
  getCartbyUserId: async (req, res) => {
    try {
      const id = req.user.id
      const cart = await getCartbyUserId(id)
      res.status(200).json({ message: "Success Get Cart", data: cart })
    } catch (err) {
      res.status(500).json({ message: "Failed Get Cart" })
    }
  },
  createCart: async (req, res) => {
    try {
      const id = req.user.id
      console.log(id)
      const cart = req.body
      const newCart = await createCart(cart, id)
      res.status(201).json({ message: "Success Create Cart", data: newCart })
    } catch (err) {
      res.status(500).json({ message: "Failed Create Cart" })
    }
  }
}

export default cartsController
