import { prisma } from "../config/prisma.js"
import { ORDER_STATUS } from "../constants/order.js"

const getOrders = async () => {
  return await prisma.order.findMany()
}

const createOrderTransaction = async (selectedCarts, userId) => {
  const ordersData = await getOrders()

  let invoiceNumber = 0

  if (ordersData.length === 0) {
    invoiceNumber = 1
  } else {
    ordersData.sort((a, b) => b.id - a.id)

    const lastOrderId = ordersData[0].id
    invoiceNumber = lastOrderId + 1
  }

  const totalOrder = selectedCarts.reduce((total, cart) => {
    return total + cart.total
  }, 0)

  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        invoice: String(invoiceNumber),
        date: new Date(),
        userId: userId,
        total: totalOrder,
        status: ORDER_STATUS.WAITING_FOR_PAYMENT
      }
    })

    if (!order) {
      throw new Error("Failed to create order")
    }

    const orderItemsData = selectedCarts.map((cart) => {
      return {
        productId: cart.productId,
        orderId: order.id,
        quantity: cart.quantity,
        total: cart.total,
        price: cart.Product.price
      }
    })

    const orderItems = await tx.orderItem.createMany({ data: orderItemsData })

    if (!orderItems) {
      throw new Error("Failed to create order items")
    }

    await tx.cart.deleteMany({
      where: {
        userId,
        id: {
          in: selectedCarts.map((cart) => cart.id)
        }
      }
    })

    return order
  })
}

const getOrdersByUserId = async (userId) => {
  return await prisma.order.findMany({
    where: {
      userId
    },
    orderBy: {
      date: "desc"
    }
  })
}

const getAllAdminOrders = async ({ skip = 0, take = 10 }) => {
  return await prisma.order.findMany({
    orderBy: {
      date: "desc"
    },
    skip,
    take
  })
}

export { getOrders, createOrderTransaction, getOrdersByUserId, getAllAdminOrders }
