import axios from "axios"

const getShippingCostByProvince = async (province) => {
  try {
    const response = await axios.get("https://api.rajaongkir.com/starter/province", {
      headers: {
        key: process.env.RAJAONGKIR_API_KEY
      }
    })
    return response.data.rajaongkir.results
  } catch (error) {
    throw new Error("Failed to get shipping cost by province")
  }
}

const getShippingCostByCity = async (provinceId) => {
  try {
    const response = await axios.get(
      `https://api.rajaongkir.com/starter/city?province=${provinceId}`,
      {
        headers: {
          key: process.env.RAJAONGKIR_API_KEY
        }
      }
    )
    const cities = response.data.rajaongkir.results.filter(
      (city) => city.province_id === provinceId
    )
    return cities
  } catch (error) {
    throw new Error("Failed to get shipping cost by city")
  }
}

const createcors = async (origin, destination, weight, courier) => {
  try {
    const response = await axios.post(
      `https://api.rajaongkir.com/starter/cost`,
      {
        origin,
        destination,
        weight,
        courier
      },
      {
        headers: {
          key: process.env.RAJAONGKIR_API_KEY
        }
      }
    )
    return response.data.rajaongkir.results
  } catch (error) {
    throw new Error("Failed to get shipping cost")
  }
}

const getCityById = async (cityId) => {
  try {
    const response = await axios.get(
      `https://api.rajaongkir.com/starter/city?id=${cityId}`,
      {
        headers: {
          key: process.env.RAJAONGKIR_API_KEY
        }
      }
    )
    const city = response.data.rajaongkir.results
    return city
  } catch (error) {
    throw new Error("Failed to get shipping cost by city")
  }
}

export { getShippingCostByProvince, getShippingCostByCity, createcors, getCityById }
