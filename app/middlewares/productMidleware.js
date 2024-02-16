const validateInputProduct = (req, res, next) => {
  const { name, quantity, price, description, categoryId } = req.body

  if (!name || !quantity || !price || !description || categoryId) {
    return res.status(400).json({
      message: "Input must be filled!"
    })
  }

  next()
}

export { validateInputProduct }
