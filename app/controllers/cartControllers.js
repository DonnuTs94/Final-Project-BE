import {
  getCartbyUserId,
  createCart,
  updateCartQuantity,
  getCartbyUserIdAndProductId,
  deleteItemInCart
} from "../services/cartService.js"
import { findProductbyId } from "../services/productService.js"

const cartsController = {
  getCartByUserId: async (req, res) => {
    try {
      const id = req.user.id
      const cart = await getCartByUserId(id)
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
  },
  updateCart: async (req, res) => {
    try {
      const userId = req.user.id
      const product = await findProductbyId(req.body.productId)
      const { productId, quantity } = req.body
      const productExistInCart = await getCartbyUserIdAndProductId(userId, productId)
      if (!productExistInCart) {
        return res.status(400).json({ message: "Products doesn't exist in cart" })
      }
      if (quantity >= product.quantity) {
        return res.status(400).json({ message: "Product stock is not available" })
      }
      const totalAmount = Number(quantity) * productExistInCart.Product.price
      const cartId = productExistInCart.id
      const cartUpdate = await updateCartQuantity(cartId, quantity, totalAmount)
      res.status(201).json({ message: "Success update quantity cart", data: cartUpdate })
    } catch (err) {
      res.status(500).json({ message: "Failed update Cart" })
    }
  },
  deleteItemInCart: async (req, res) => {
    try {
      const { id } = req.params
      if (isNaN(Number(id))) {
        return res.status(400).json({ message: "Invalid ID parameter" })
      }
      const itemId = Number(id)
      await deleteItemInCart(itemId)
      res.status(200).json({ message: "Success Delete Category" })
    } catch (err) {
      res.status(500).json({ message: "Failed delete item in Cart" })
    }
  }
}

export default cartsController
