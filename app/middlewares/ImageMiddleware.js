import multer from "multer"
import fs from "fs"
import { upload } from "../config/uploader.js"
import { LIMIT_FILE_SIZE, MAX_FILE_ACCEPT } from "../constants/upload.js"
import { getImageCountByProductId } from "../services/productImageService.js"

const validateFileUpload = ({ path, fileTypes, filePrefix, imgSize }) => {
  return async (req, res, next) => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true })
    }

    const handleMulterError = (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === LIMIT_FILE_SIZE) {
          return res.status(400).json({
            message: "File too large, maximum allowed is 1 mb"
          })
        } else {
          return res.status(400).json({
            message: "File upload error: " + err.message
          })
        }
      } else if (err) {
        return res.status(400).json({
          message: "File upload error: " + err.message
        })
      }

      if (req.files.length > MAX_FILE_ACCEPT) {
        req.files.map((file) => {
          fs.unlinkSync(file.path)
        })
        return res.status(400).json({
          message: "Too many files uploaded. Maximum allowed is " + MAX_FILE_ACCEPT
        })
      }
      next()
    }

    const uploadMiddleware = upload({
      acceptedFileTypes: fileTypes,
      filePrefix: filePrefix,
      maxSize: imgSize,
      dynamicDestination: path
    })

    uploadMiddleware(req, res, (err) => {
      handleMulterError(err)
    })
  }
}

const validateImageApprovalLimit = async (req, res, next) => {
  const productId = Number(req.params.id)

  if (isNaN(Number(productId))) {
    return res.status(400).json({
      message: "ProductId must be a number"
    })
  }

  const getImageProduct = await getImageCountByProductId(productId)

  if (getImageProduct >= MAX_FILE_ACCEPT) {
    return res.status(400).json({
      message: "You have maximum images files"
    })
  }

  next()
}

export { validateFileUpload, validateImageApprovalLimit }
