import { getCityById } from "../api/rajaOngkir.js"
import { prisma } from "../config/prisma.js"
import { ORDER_STATUS } from "../constants/order.js"

const getOrders = async () => {
  return await prisma.order.findMany()
}

const createOrderTransaction = async (
  selectedCarts,
  destination,
  totalOngkir,
  userId
) => {
  const ordersData = await getOrders()

  let invoiceNumber = 0

  if (ordersData.length === 0) {
    invoiceNumber = 1
  } else {
    ordersData.sort((a, b) => b.id - a.id)

    const lastOrderId = ordersData[0].id
    invoiceNumber = lastOrderId + 1
  }

  const destinationCity = await getCityById(destination)

  const totalOrder = selectedCarts.reduce((total, cart) => {
    return total + cart.total
  }, 0)

  const grandTotal = totalOrder + totalOngkir

  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        invoice: String(invoiceNumber),
        date: new Date(),
        userId: userId,
        destination,
        totalOrder,
        totalOngkir,
        grandTotal,
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

    const orderItemsList = await tx.orderItem.findMany({
      where: {
        orderId: order.id
      }
    })

    // await tx.cart.deleteMany({
    //   where: {
    //     userId,
    //     id: {
    //       in: selectedCarts.map((cart) => cart.id)
    //     }
    //   }
    // })

    return { ...order, destination: destinationCity, orderItemsList }
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

const updateStatusOrder = async (orderId, status) => {
  return await prisma.order.update({
    where: {
      id: Number(orderId)
    },
    data: {
      status
    }
  })
}

const findOrderById = async (orderId) => {
  return await prisma.order.findFirst({
    where: {
      id: orderId
    }
  })
}

export {
  getOrders,
  createOrderTransaction,
  getOrdersByUserId,
  getAllAdminOrders,
  updateStatusOrder,
  findOrderById
}
