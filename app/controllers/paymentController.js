import { validationResult, body } from "express-validator"
import snap from "../config/snapMidtrans.js"

const PostCreateTransaction = (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() })
    return
  }

  const { order_id, first_name, last_name, email, phone, items } = req.body

  const gross_amount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const parameters = {
    transaction_details: {
      order_id: order_id,
      gross_amount: gross_amount
    },
    item_details: items,
    customer_details: {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone
    },
    expiry: {
      unit: "minute",
      duration: 1
    }
  }

  snap
    .createTransaction(parameters)
    .then((transaction) => {
      return res.status(200).send(transaction)
    })
    .catch((error) => {
      console.log(error)
      return res
        .status(Number(error.httpStatusCode))
        .send({ message: error.message, status: Number(error.httpStatusCode) })
    })
}

export default PostCreateTransaction
