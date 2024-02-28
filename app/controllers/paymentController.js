import { validationResult } from "express-validator"
import snap from "../config/snapMidtrans.js"
import { findOrderById, updateStatusOrder } from "../services/orderServices.js"
import { ORDER_STATUS } from "../constants/order.js"

const paymentController = {
  createPayment: async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }

      const orderId = req.body.order_id

      const order = await findOrderById(orderId)

      if (!order) {
        return res.status(404).json({ message: "Pesanan tidak ditemukan" })
      }

      if (order.status !== ORDER_STATUS.WAITING_FOR_PAYMENT) {
        return res.status(400).json({ message: "Pesanan sudah dibayar atau tidak valid" })
      }

      const { id, grandTotal } = order

      const expiry = {
        unit: "minute",
        duration: 1
      }

      const parameters = {
        transaction_details: {
          order_id: id,
          gross_amount: Math.round(grandTotal)
        },
        expiry: expiry
      }

      const transaction = await snap.createTransaction(parameters)

      if (transaction && transaction.transaction_status === "settlement") {
        await updateStatusOrder(orderId, ORDER_STATUS.PAID)
      }

      return res.status(200).json(transaction)
    } catch (error) {
      console.error("Error dalam membuat pembayaran:", error)
      return res.status(500).json({ message: "Internal Server Error" })
    }
  }
}

export default paymentController
