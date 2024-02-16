import { getCategoryById } from "../services/categoryService.js"

const validateInputProduct = async (req, res, next) => {
  const { name, quantity, price, description, categoryId } = req.body

  if (!name || !quantity || !price || !description || categoryId) {
    return res.status(400).json({
      message: "Input must be filled!"
    })
  }

  const findCategoryId = await getCategoryById(categoryId)

  if (!findCategoryId) {
    return res.status(400).json({
      message: "Category does'nt exist"
    })
  }

  next()
}

export { validateInputProduct }
