const validateInputOrder = async (req, res, next) => {
  const { cartId, destination, weight, shippingOption } = req.body

  if (!cartId || !destination || !weight) {
    return res.status(400).json({
      message: "Please provide cart ids"
    })
  }

  if (!Array.isArray(cartId)) {
    return res.status(400).json({
      message: "Cart ids must be an array"
    })
  }

  if (cartId.length === 0) {
    return res.status(400).json({
      message: "Cart ids cannot be empty"
    })
  }

  if (isNaN(Number(destination))) {
    return res.status(400).json({
      message: "Destination must be a number"
    })
  }

  if (typeof weight !== "number" || weight <= 1000) {
    return res.status(400).json({
      message: "Weight must be a number and at least 1000 grams"
    })
  }

  if (typeof shippingOption !== "string") {
    return res.status(400).json({
      message: "Shipping option must be a string"
    })
  }

  if (cartId.filter((id) => isNaN(Number(id))).length > 0) {
    return res.status(400).json({
      message: "Cart id must be a number"
    })
  }

  if (cartId.filter((id) => id <= 0).length > 0) {
    return res.status(400).json({
      message: "Cart id must be greater than 0"
    })
  }

  next()
}

export { validateInputOrder }
