import { getCartbyUserId, createCart, updateCartQuantity, getCartbyUserIdAndProductId } from "../services/cartService.js"
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
      const id = req.user.id
      const cart = req.body
      const newCart = await createCart(cart, id)
      res.status(201).json({ message: "Success Create Cart", data: newCart })
    } catch (err) {
      res.status(500).json({ message: "Failed Create Cart" })
    }
  },
  updateCart:async (req,res) => {
    try {
      const userId = req.user.id
      const { productId ,quantity } = req.body
      const productExistInCart = await getCartbyUserIdAndProductId(userId, productId)
      if(!productExistInCart) {
        return res.status(400).json({message: "Products doesn't exist in cart"})
      }
      const totalAmount = (Number(quantity) * productExistInCart.Product.price)
      const cartId = productExistInCart.id
      const cartUpdate = await updateCartQuantity(cartId, quantity,totalAmount)
      res.status(201).json({message : "Success update quantity cart", data: cartUpdate})
    } catch (err) {
      res.status(500).json({ message: "Failed update Cart" })
    }
  }
}

export default cartsController
