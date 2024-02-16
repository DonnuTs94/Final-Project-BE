import multer from "multer"
import fs from "fs"
import { upload } from "../config/uploader"
import { LIMIT_FILE_SIZE } from "../constants/upload"

const validateFileUpload = ({
  path,
  fileName,
  fileTypes,
  filePrefix,
  imgSize,
  allowMultiple = false
}) => {
  return async (req, res, next) => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true })
    }

    const handleMulterError = (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === LIMIT_FILE_SIZE) {
          return res.status(400).json({
            message: "File too large"
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

      if (allowMultiple) {
        if (!req.files) {
          return res.status(400).json({
            message: "No file selected"
          })
        }

        const maxFileCount = allowMultiple ? 6 : 1

        if (req.files.length > maxFileCount) {
          req.files.map((file) => {
            fs.unlinkSync(file.path)
          })
          return res.status(400).json({
            message: "Too many files uploaded. Maximum allowed is" + maxFileCount
          })
        }
      } else {
        if (!req.file) {
          return res.status(400).json({
            message: "No file selected"
          })
        }
      }
      next()
    }

    const uploadMiddleware = upload({
      acceptedFileTypes: fileTypes,
      filePrefix: filePrefix,
      maxSize: imgSize,
      dynamicDestination: path
    })

    if (allowMultiple) {
      uploadMiddleware.array(fileName)(req, res, function (err) {
        handleMulterError(err)
      })
    } else {
      uploadMiddleware.single(fileName)(req, res, function (err) {
        handleMulterError(err)
      })
    }
  }
}

export { validateFileUpload }
