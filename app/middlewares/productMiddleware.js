import { getCategoryById } from "../services/categoryService.js"

const validateInputProduct = async (req, res, next) => {
  const { name, quantity, price, description, categoryId } = req.body

  if (!name || !quantity || !price || !description || !categoryId) {
    return res.status(400).json({
      message: "All input fields must be filled!"
    })
  }

  if (isNaN(Number(quantity))) {
    return res.status(400).json({
      message: "Quantity must be a number"
    })
  }

  if (isNaN(Number(price))) {
    return res.status(400).json({
      message: "Price must be a number"
    })
  }

  if (isNaN(Number(categoryId))) {
    return res.status(400).json({
      message: "Category id must be a number"
    })
  }
  const findCategoryId = await getCategoryById(Number(categoryId))

  if (!findCategoryId) {
    return res.status(400).json({
      message: "Category doesn't exist"
    })
  }

  next()
}

const validateParamsProduct = async (req, res, next) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({
      message: "Product id is required"
    })
  }

  if (isNaN(Number(id))) {
    return res.status(400).json({
      message: "Product id must be a number"
    })
  }

  next()
}

const validateBodyImgId = (req, res, next) => {
  const { imageId } = req.body

  if (!imageId) {
    return res.status(400).json({
      message: "Image id is required"
    })
  }

  if (isNaN(Number(imageId))) {
    return res.status(400).json({
      message: "Image id must be a number"
    })
  }

  next()
}

export { validateInputProduct, validateParamsProduct, validateBodyImgId }
