export const Role = {
  ADMIN: "admin",
  USER: "user",
}

export const Permission = {
  BROWSE_PRODUCTS: "browse_products",
  READ_PRODUCT: "read_product",
  EDIT_PRODUCT: "edit_product",
  ADD_PRODUCT: "add_product",
  DELETE_PRODUCT: "delete_product",

  BROWSE_CATEGORIES: "browse_categories",
  READ_CATEGORY: "read_category",
  EDIT_CATEGORY: "edit_category",
  ADD_CATEGORY: "add_category",
  DELETE_CATEGORY: "delete_category",

  BROWSE_CARTS: "browse_carts",
  EDIT_CART: "edit_cart",
  ADD_CART: "add_cart",
  DELETE_CART: "delete_cart",

  BROWSE_ORDERS: "browse_orders",
  READ_ORDER: "read_order",
  ADD_ORDER: "add_order",
}

export const PermissionAssignment = {
  [Role.ADMIN]: [
    Permission.BROWSE_PRODUCTS,
    Permission.READ_PRODUCT,
    Permission.DELETE_PRODUCT,
    Permission.EDIT_PRODUCT,
    Permission.ADD_PRODUCT,

    Permission.BROWSE_CATEGORIES,
    Permission.READ_CATEGORY,
    Permission.DELETE_CATEGORY,
    Permission.EDIT_CATEGORY,
    Permission.ADD_CATEGORY,

    Permission.BROWSE_ORDERS,
  ],

  [Role.USER]: [
    Permission.BROWSE_PRODUCTS,
    Permission.READ_PRODUCT,

    Permission.BROWSE_CATEGORIES,
    Permission.READ_CATEGORY,

    Permission.BROWSE_CARTS,
    Permission.DELETE_CART,
    Permission.EDIT_CART,
    Permission.ADD_CART,

    Permission.BROWSE_ORDERS,
    Permission.READ_ORDER,
    Permission.ADD_ORDER,
  ],
}
