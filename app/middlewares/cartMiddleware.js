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
      message: "Minimum Quantity is 1"
    })
  }

  next()
}

const validateDeleteCart = (req, res, next) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: "Cart id is required"
    })
  }

  if (isNaN(Number(id))) {
    return res.status(400).json({
      message: "Cart id must be a number"
    })
  }

  next()
}

export { validateCartRequestBody, validateDeleteCart }
