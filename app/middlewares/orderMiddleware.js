const validateInputOrder = async (req, res, next) => {
  const { cartId } = req.body

  if (!cartId) {
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
