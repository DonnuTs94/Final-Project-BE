export const validateCart = (req, res, next) => {
  const { quantity } = req.body
  if (!quantity) {
    return res.status(400).json({
      message: "Please provide quantity"
    })
  }
  next()
}

export const validateCartId = (req, res, next) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: "Please provide cart id"
    })
  }
  next()
}

export const validateProductId = (req, res, next) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({
      message: "Please provide product id"
    })
  }
  next()
}

export const validateQuantity = (req, res, next) => {
  const { quantity } = req.body
  if (!quantity) {
    return res.status(400).json({
      message: "Please provide quantity"
    })
  }
  next()
}
