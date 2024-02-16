const validateCartRequestBody = (req, res, next) => {
  const { productId, quantity } = req.body
  if (!productId) {
    return res.status(400).json({
      message: "Please provide product id"
    })
  }

  if (isNaN(Number(productId))) {
    return res.status(400).json({
      message: "Product id must be a number"
    })
  }

  if (!quantity && quantity !== 0) {
    return res.status(400).json({
      message: "Please provide quantity"
    })
  }

  if (quantity <= 0) {
    return res.status(400).json({
      message: "Minimun Quantity is 1"
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
