import { getCartbyUserId, createCart } from "../services/cartService.js"
import { findProductbyId } from "../services/productService.js"

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
      const product = await findProductbyId(req.body.productId)

      if (!product) {
        return res.status(400).json({ message: "Product not found" })
      }

      if (product.quantity < req.body.quantity) {
        return res.status(400).json({ message: "Quantity not enough" })
      }
      const { quantity, productId } = req.body
      const id = req.user.id
      const cart = await createCart({ quantity, productId }, id)
      res.status(200).json({ message: "Success Create Cart", data: cart })
    } catch (err) {
      res.status(500).json({ message: "Failed Create Cart" })
    }
  }
}

export default cartsController
