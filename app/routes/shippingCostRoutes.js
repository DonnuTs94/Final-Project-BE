import express from "express"
import shippingCostController from "../controllers/shippingCostControllers.js"

const router = express.Router()

router.get("/province", shippingCostController.getShippingCostByProvince)
router.get("/city", shippingCostController.getShippingCostByCity)
router.post("/cost", shippingCostController.createcors)

export default router
