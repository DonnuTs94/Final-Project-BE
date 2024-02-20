import { findRole } from "../services/userServices.js"

export const getRoleId = async (role) => {
  const roleData = await findRole()
  return roleData.find((data) => data.name === role)
}
