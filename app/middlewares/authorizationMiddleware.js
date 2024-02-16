import { prisma } from "../config/prisma.js"

const authorizationPermission = (permission) => {
  return async (req, res, next) => {
    const permissionRecord = await prisma.permissionRole.findMany({
      where: {
        roleId: Number(req.user.roleId)
      },
      include: {
        Permission: true
      }
    })

    const permissions = permissionRecord.map((record) => record.Permission?.name)

    if (!permissions.includes(permission)) {
      return res.status(403).json({
        message: "Forbidden!"
      })
    }

    next()
  }
}

export { authorizationPermission }
