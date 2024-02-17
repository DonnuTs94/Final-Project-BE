import {
  createOrderTransaction,
  getOrdersByUserId,
  getAllAdminOrders
} from "../services/orderServices.js"

import { getCartsByCartIdUserId } from "../services/cartService.js"
import { createcors } from "../api/rajaOngkir.js"
import { ORDER_SHIPPING } from "../constants/order.js"

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { cartId, destination, weight, shippingOption } = req.body
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

      const ongkirDetail = await createcors(
        ORDER_SHIPPING.ORDER_ORIGIN,
        destination,
        weight,
        ORDER_SHIPPING.ORDER_COURIER
      )

      const selectedService = ongkirDetail[0].costs.filter(
        (cost) => cost.service === shippingOption
      )[0]

      const totalOngkir = selectedService.cost[0].value

      const newOrder = await createOrderTransaction(
        selectedCarts,
        destination,
        totalOngkir,
        userId
      )

      res.status(201).json({
        message: "Success Create Order",
        data: newOrder
      })
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error"
      })
    }
  },

  getOrdersByUserId: async (req, res) => {
    try {
      const userId = req.user.id
      const orderBy = { date: "desc" }

      const orders = await getOrdersByUserId(userId, orderBy)

      res.status(200).json({
        message: "Success Get Orders by User ID and Order By Date",
        data: orders
      })
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error"
      })
    }
  },

  getAllAdminOrders: async (req, res) => {
    try {
      const { page = 1, pageSize = 10 } = req.query
      const skip = (page - 1) * pageSize
      const take = parseInt(pageSize)

      const orders = await getAllAdminOrders({ skip, take })

      res.status(200).json({
        message: "Success Get All Admin Orders",
        data: orders
      })
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error"
      })
    }
  }
}

export default orderController
