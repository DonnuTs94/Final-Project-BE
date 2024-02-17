import { Router } from "express"
import productController from "../controllers/productController.js"
import { validateFileUpload } from "../middlewares/ImageMiddleware.js"
import { FILE_PREFIX, FILE_TYPES, PATH, SIZE_1MB } from "../constants/upload.js"
import { validateToken } from "../middlewares/authMiddleware.js"
import { validateInputProduct } from "../middlewares/productMiddleware.js"
import { authorizationPermission } from "../middlewares/authorizationMiddleware.js"
import { Permission } from "../constants/authorization.js"

const router = Router()

router.get("/", productController.getAllProduct)

router.post(
  "/",
  validateToken,
  authorizationPermission(Permission.ADD_PRODUCT),
  validateFileUpload({
    path: PATH,
    fileTypes: FILE_TYPES,
    filePrefix: FILE_PREFIX,
    imgSize: SIZE_1MB
  }),
  validateInputProduct,
  productController.createProduct
)

export default router
