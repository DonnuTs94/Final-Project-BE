import express from "express"
import mainRoutes from "./app/mainRoutes.js"
import cors from "cors"
import { PrismaClient } from "@prisma/client" // Import PrismaClient dari modul Prisma
import { updateStatusOrder } from "./app/services/orderServices.js"
import { ORDER_STATUS } from "./app/constants/order.js"

const app = express()
const prisma = new PrismaClient() // Inisialisasi PrismaClient

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.use(mainRoutes)

app.post("/webhook/midtrans", async (req, res) => {
  console.log(req.body)
  try {
    const { transaction_status, order_id } = req.body

    if (transaction_status === "capture" || transaction_status === "settlement") {
      const orderIdInt = parseInt(order_id)
      if (!isNaN(orderIdInt)) {
        await updateStatusOrder(orderIdInt, ORDER_STATUS.PAID)
        console.log("Order berhasil diperbarui:", orderIdInt)
      } else {
        console.log("Error: Format order_id tidak valid")
      }
    }

    if (transaction_status === "cancel" || transaction_status === "expire") {
      try {
        const orderIdInt = parseInt(order_id)
        if (!isNaN(orderIdInt)) {
          await updateStatusOrder(orderIdInt, ORDER_STATUS.CANCELLED)
          console.log("Order berhasil diperbarui:", orderIdInt)
        } else {
          console.log("Error: Format order_id tidak valid")
        }
      } catch (error) {
        console.error("Error dalam memperbarui status pesanan:", error)
        return res.status(500).json({ message: "Gagal memperbarui status pesanan" })
      }
    }

    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

app.get("/", (req, res) => {
  res.send("Hello World!")
})

export default app
