import fs from "fs"
import {
  createProductImage,
  deleteImageById,
  getImageById
} from "../services/productImageService.js"
import { PATH } from "../constants/upload.js"

const productImageController = {
  addImage: async (req, res) => {
    try {
      const productId = Number(req.params.id)

      const files = req.files

      if (files.length === 0) {
        return res.status(400).json({
          message: "Please select at least one image to upload for the product."
        })
      }

      if (files.length > 1) {
        files.map((file) => {
          fs.unlinkSync(file.path)
        })

        return res.status(400).json({
          message: "Only allowed 1 image upload"
        })
      }

      const imageUrl = files.map((file) => {
        return file.filename
      })

      await createProductImage(imageUrl[0], productId)

      return res.status(200).json({
        message: "Successfully add new image"
      })
    } catch (err) {
      return res.status(500).json({
        message: "Internal server error"
      })
    }
  },

  deleteImage: async (req, res) => {
    try {
      const { imageId } = req.body

      const productImage = await getImageById(Number(imageId))

      if (!productImage) {
        return res.status(400).json({
          message: "Image doesn't exist!"
        })
      }

      const imageData = await deleteImageById(productImage.id)

      const imagePath = `${PATH}/` + imageData.imageUrl

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
        return res.status(200).json({
          message: "Successfully delete image"
        })
      } else {
        return res.status(400).json({
          message: "Image file not found!"
        })
      }
    } catch (err) {
      return res.status(500).json({
        message: "Internal server error"
      })
    }
  }
}

export default productImageController
