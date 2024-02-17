import { getCartByUserId, createCart } from "../services/cartService.js"
import { findProductById } from "../services/productService.js"

const cartsController = {
  getCartByUserId: async (req, res) => {
    try {
      const id = req.user.id
      const cart = await getCartByUserId(id)

      if (cart.length === 0) {
        return res.json({
          message: "Cart is empty"
        })
      }
      res.status(200).json({ message: "Success Get Cart", data: cart })
    } catch (err) {
      res.status(500).json({ message: "Failed Get Cart" })
    }
  },

  createCart: async (req, res) => {
    try {
      const product = await findProductById(req.body.productId)

      if (!product) {
        return res.status(400).json({ message: "Product not found" })
      }

      if (product.quantity < req.body.quantity) {
        return res.status(400).json({ message: "Product stock is not available" })
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
