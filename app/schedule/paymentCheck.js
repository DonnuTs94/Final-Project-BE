import schedule from "node-schedule"
import { addHours, addSeconds } from "date-fns"
import { ADD_1H, ORDER_STATUS } from "../constants/order.js"
import { prisma } from "../config/prisma.js"

const paymentCheck = (order) => {
  //   const timeMustBeCheck = addSeconds(order.date, 5)
  const timeMustBeCheck = addHours(order.date, ADD_1H)

  schedule.scheduleJob(timeMustBeCheck, async () => {
    if (order.status === ORDER_STATUS.WAITING_FOR_PAYMENT) {
      // dont forget to delete
      console.log("CHECK DB!")
      //   ============================
      await prisma.order.update({
        where: {
          id: order.id
        },
        data: {
          status: ORDER_STATUS.CANCELLED
        }
      })
    }
  })
}

export { paymentCheck }
