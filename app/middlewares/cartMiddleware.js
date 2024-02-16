const validateCartRequestBody = (req, res, next) => {
  const { productId, quantity } = req.body
  if (!productId) {
    return res.status(400).json({
      message: "Please provide product id"
    })
  }

  if (!quantity) {
    return res.status(400).json({
      message: "Please provide quantity"
    })
  }

  next()
}

const validateCartRequestQuantityBody = (req, res, next) => {
  const { quantity } = req.body

  if (!quantity) {
    return res.status(400).json({
      message: "Please provide quantity format number"
    })
  }

  next()
}

export { validateCartRequestBody }
