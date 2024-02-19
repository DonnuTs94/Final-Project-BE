import {
  getShippingCostByProvince,
  getShippingCostByCity,
  createcors
} from "../api/rajaOngkir.js"

const shippingCostController = {
  getShippingCostByProvince: async (req, res) => {
    try {
      const shippingCosts = await getShippingCostByProvince()
      res
        .status(200)
        .json({ message: "Success Get Shipping Cost By Province", data: shippingCosts })
    } catch (error) {
      res.status(500).json({
        message: "Failed to get shipping cost by province"
      })
    }
  },

  getShippingCostByCity: async (req, res) => {
    try {
      const provinceId = req.query.province
      const shippingCosts = await getShippingCostByCity(provinceId)
      res
        .status(200)
        .json({ message: "Success Get Shipping Cost By City", data: shippingCosts })
    } catch (error) {
      res.status(500).json({ message: "Failed to get shipping cost by city" })
    }
  },

  createcors: async (req, res) => {
    try {
      const { origin, destination, weight, courier } = req.body
      const shippingCosts = await createcors(origin, destination, weight, courier)
      res.status(200).json({ message: "Success Get Shipping Cost", data: shippingCosts })
    } catch (error) {
      res.status(500).json({ message: "Failed to get shipping cost" })
    }
  }
}

export default shippingCostController
