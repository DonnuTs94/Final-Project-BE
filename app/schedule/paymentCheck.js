import schedule from "node-schedule"
import { addHours, addMinutes, addSeconds } from "date-fns"
import { ADD_1H, ORDER_STATUS } from "../constants/order.js"
import { findOrderById, updateStatusOrder } from "../services/orderServices.js"
import { findOrderItemFromOrderId } from "../services/orderItemService.js"
import { updateManyProductQty } from "../services/productService.js"

const paymentCheck = (order) => {
  // const timeMustBeCheck = addSeconds(order.date, 5) // buat testing aja
  const timeMustBeCheck = addMinutes(order.date, 1) // buat live


  schedule.scheduleJob(timeMustBeCheck, async () => {
    const orderData = await findOrderById(order.id)

    if (orderData?.status === ORDER_STATUS.WAITING_FOR_PAYMENT) {
      console.log(`Update status canceled for orderId: ${order.id}  `)
      await updateStatusOrder(order.id, ORDER_STATUS.CANCELLED)
      const getOrderItemInOrder = await findOrderItemFromOrderId(order.id)
      console.log(getOrderItemInOrder, "OrderItem")
      await Promise.all(
        getOrderItemInOrder.map(async (item) => {
          await updateManyProductQty(item.productId, item.quantity)
          console.log(
            `Updating product: id ${item.productId} and return quantity by ${item.quantity}`
          )
        })
      )
    }
  })
}

export { paymentCheck }
