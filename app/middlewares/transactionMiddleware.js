import { body, query } from "express-validator"

const validateTransaction = (method) => {
  switch (method) {
    case "createTransaction": {
      return [
        body("order_id", "order ID is Required").exists(),
        body("order_id", "order ID is Required").notEmpty(),
        body("order_id", "order must be string").isString(),

        body("ammount", "ammount is Required").exists(),
        body("ammount", "ammount is Required").notEmpty(),
        body("ammount", "ammount must be number integer").isInt(),

        body("first_name", "first name buyer is required").exists(),
        body("first_name", "first name buyer is required").notEmpty(),
        body("first_name", "first name buyer must be string").isString(),

        body("last_name").optional(),
        body("last_name").notEmpty(),
        body("last_name", "last name must be string").isString(),

        body("email", "email is required").exists(),
        body("email", "email is required").notEmpty(),
        body("email", "email must be in Email format").isEmail(),

        body("phone", "phone is required").exists(),
        body("phone", "phone is required").notEmpty(),
        body("phone", "phone must be string format").isString(),
        body("phone", "phone must in format indonesia").isMobilePhone("id-ID"),

        body("items", "items is required").exists(),
        body("items", "items must be array format").isArray(),

        body("items.*.id", "items id is required").exists(),
        body("items.*.id", "items id is required").notEmpty(),
        body("items.*.id", "items id must be string").isString(),

        body("items.*.price", "items price is required").exists(),
        body("items.*.price", "items price is required").notEmpty(),
        body("items.*.price", "items price must be integer").isInt(),

        body("items.*.quantity", "items quantity is required").exists(),
        body("items.*.quantity", "items quantity is required").notEmpty(),
        body("items.*.quantity", "items quantity must be integer").isInt(),

        body("items.*.name", "items name is required").exists(),
        body("items.*.name", "items name is required").notEmpty(),
        body("items.*.name", "items must be string").isString()
      ]
    }
  }
}

export default validateTransaction
