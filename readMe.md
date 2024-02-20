## User Endpoints

### Get User

- **Method:** GET
- **Endpoint:** /user/
- **Description:** Retrieves information about the current user.

### Register User

- **Method:** POST
- **Endpoint:** /user/register
- **Description:** Registers a new user.
- **BodyRequest:**

```bash
{
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "password": "string",
    "address": "string"
}
```

### Edit User

- **Method:** PUT
- **Endpoint:** /user/edit
- **Description:** Modifies user information.
- **BodyRequest:**

```bash
{
    "firstName": "string",
    "lastName": "string",
    "address": "string"
}
```

### User Authentication

#### Login

- **Method:** POST
- **Endpoint:** /auth/login
- **Description:** Logs a user in and provides authentication token.
- **BodyRequest:**

```bash
{
    "email": "string",
    "password": "string",
}
```

---

## Category Endpoints

### Get All Categories

- **Method:** GET
- **Endpoint:** /categories/
- **Description:** Retrieves all categories.

### Create Category

- **Method:** POST
- **Endpoint:** /categories/create
- **Description:** Creates a new category.
- **BodyRequest:**

```bash
{
    "name": "string",
}
```

### Update Category

- **Method:** PUT
- **Endpoint:** /categories/update/:id
- **Description:** Updates a category.
- **BodyRequest:**

```bash
{
    "name": "string",
}
```

### Hard Delete Category

- **Method:** DELETE
- **Endpoint:** /categories/harddelete/:id
- **Description:** Permanently deletes a category.

### Soft Delete Category

- **Method:** DELETE
- **Endpoint:** /categories/delete/:id
- **Description:** Soft deletes a category.

---

## Product Endpoints

### Get All Products

- **Method:** GET
- **Endpoint:** /product/
- **Description:** Retrieves all products.

### Get Product by ID

- **Method:** GET
- **Endpoint:** /product/:id
- **Description:** Retrieves product by ID.

### Create Product

- **Method:** POST
- **Endpoint:** /product/
- **Description:** Creates a new product.
- **BodyRequest:**

```bash
{
    "name": "string",
    "description": "string",
    "quantity": integer,
    "price": integer,
    "imageUrl": FILE
    "categoryId: integer,
}
```

### Upload Image for Product

- **Method:** POST
- **Endpoint:** /product/:id/image
- **Description:** Uploads an image for a product.
- **BodyRequest:**

```bash
{
    "imageUrl": FILE
}
```

### Soft Delete Product

- **Method:** DELETE
- **Endpoint:** /product/softDelete/:id
- **Description:** Soft deletes a product.

### Delete Image for Product

- **Method:** DELETE
- **Endpoint:** /product/:id/image
- **Description:** Deletes an image for a product.
- **BodyRequest:**

```bash
{
    "imageId": "integer",
}
```

### Update Product

- **Method:** PUT
- **Endpoint:** /product/:id/product
- **Description:** Updates a product.

---

## Cart Endpoints

### Get All Carts

- **Method:** GET
- **Endpoint:** /carts/
- **Description:** Retrieves all carts.

### Create Cart

- **Method:** POST
- **Endpoint:** /carts/create
- **Description:** Creates a new cart.
- **BodyRequest:**

```bash
{
    "quantity": integer
    "productId": "integer",
}
```

### Update Cart

- **Method:** PUT
- **Endpoint:** /carts/update
- **Description:** Updates a cart.
- **BodyRequest:**

```bash
{
    "quantity": integer
    "productId": "integer",
}
```

### Delete Cart by ID

- **Method:** DELETE
- **Endpoint:** /carts/delete/:id
- **Description:** Deletes a cart by ID.

---

## Shipping Cost Endpoints

### Get Shipping Cost by Province

- **Method:** GET
- **Endpoint:** /shippingCost/province
- **Description:** Retrieves shipping cost by province.

### Get Shipping Cost by City

- **Method:** GET
- **Endpoint:** /shippingCost/city
- **Description:** Retrieves shipping cost by city.

### Set Shipping Cost

- **Method:** POST
- **Endpoint:** /shippingCost/cost
- **Description:** Sets shipping cost.
- **BodyRequest:**

```bash
{
    "origin": "string",
    "destination": integer,
    "weight": integer,
    "courier: "string"
}
```

---

## Order Endpoints

### Create Order

- **Method:** POST
- **Endpoint:** /orders/create
- **Description:** Creates a new order.
- **BodyRequest:**

```bash
{
    "cartId": [integer],
    "destination": integer,
    "weight": integer,
    "shippingOption: "string"
}
```

### Get Orders by User

- **Method:** GET
- **Endpoint:** /orders/users
- **Description:** Retrieves orders for a user.

### Get Orders by Admin

- **Method:** GET
- **Endpoint:** /orders/admin
- **Description:** Retrieves orders for an admin.

### Get Orders by User ID

- **Method:** GET
- **Endpoint:** /orders/users/:id
- **Description:** Retrieves orders for a specific user.

### Get Orders by Admin ID

- **Method:** GET
- **Endpoint:** /orders/admin/:id
- **Description:** Retrieves orders for a specific admin.

---

## Payment Endpoints

### Transaction Payment

- **Method:** POST
- **Endpoint:** /payment/transaction
- **Description:** Processes a payment transaction.
- **BodyRequest:**

```bash
{
    "order_id": integer,
    "ammount": integer,
    "first_name": "string",
    "last_name: "string",
    "email": "string",
    "phone" "string",
    "items": [
        {
            "id": integer,
            "price": integer,
            "quantity": integer,
            "name": "string"
        }
    ]
}
```
