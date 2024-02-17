import { prisma } from "../config/prisma.js"
import { createOrderTransaction } from "../services/orderServices.js"
import { getCartsByCartIdUserId } from "../services/cartService.js"

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { cartId } = req.body
      const userId = req.user.id

      const selectedCarts = await getCartsByCartIdUserId(cartId, userId)

      if (selectedCarts.length === 0) {
        return res.status(400).json({
          message: "Cart IDs not found"
        })
      }

      if (selectedCarts.length !== cartId.length) {
        return res.status(400).json({
          message: "Any cart id not found"
        })
      }

      const outOfStockItems = selectedCarts.filter(
        (cart) => cart.quantity > cart.Product.quantity
      )

      if (outOfStockItems.length > 0) {
        const outStockId = outOfStockItems.map((cart) => cart.Product.id).join(", ")
        return res.status(400).json({
          message: `Product ID: ${outStockId} is out of stock`
        })
      }

      const newOrder = await createOrderTransaction(selectedCarts, userId)

      res.status(201).json({
        message: "Success Create Order",
        data: newOrder
      })
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error"
      })
    }
  }
}

export default orderController
