import { Router } from "express"
import productController from "../controllers/productController.js"
import {
  validateFileUpload,
  validateImageApprovalLimit
} from "../middlewares/ImageMiddleware.js"
import { FILE_PREFIX, FILE_TYPES, PATH, SIZE_1MB } from "../constants/upload.js"
import { validateToken } from "../middlewares/authMiddleware.js"
import {
  validateBodyImgId,
  validateInputProduct,
  validateParamsProduct
} from "../middlewares/productMiddleware.js"
import { authorizationPermission } from "../middlewares/authorizationMiddleware.js"
import { Permission } from "../constants/authorization.js"
import productImageController from "../controllers/productImageController.js"

const router = Router()

router.get("/table", productController.getAllProductData)
router.get("/", productController.getAllProduct)
router.get("/:id", validateParamsProduct, productController.getProductById)

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

router.post(
  "/:id/image",
  validateToken,
  validateImageApprovalLimit,
  validateFileUpload({
    path: PATH,
    fileTypes: FILE_TYPES,
    filePrefix: FILE_PREFIX,
    imgSize: SIZE_1MB
  }),
  authorizationPermission(Permission.ADD_IMAGE),
  validateParamsProduct,
  productImageController.addImage
)

router.delete(
  "/softDelete/:id",
  validateToken,
  authorizationPermission(Permission.DELETE_PRODUCT),
  validateParamsProduct,
  productController.softDeleteProduct
)

router.delete(
  "/:id/image",
  validateToken,
  authorizationPermission(Permission.DELETE_IMAGE),
  validateBodyImgId,
  productImageController.deleteImage
)

router.put(
  "/:id/product",
  validateToken,
  authorizationPermission(Permission.EDIT_PRODUCT),
  productController.editProduct
)
export default router
