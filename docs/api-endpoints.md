# API Endpoints Documentation

## Base URL

### Local Development

```text
http://localhost:8000/api/v1
```

### Production

```text
https://your-render-backend.onrender.com/api/v1
```

---

# Health Check

## GET /

Check API availability.

### Request

```http
GET /
```

### Response

```json
{
  "message": "Inventory Order Management API",
  "version": "1.0.0",
  "status": "healthy"
}
```

---

# Dashboard

## GET /dashboard

Retrieve dashboard statistics, low-stock products, and recent orders.

### Request

```http
GET /api/v1/dashboard
```

### Response

```json
{
  "stats": {
    "total_products": 24,
    "total_customers": 12,
    "total_orders": 45,
    "inventory_value": 385000
  },
  "low_stock_products": [
    {
      "id": 1,
      "name": "Wireless Mouse",
      "sku": "MOU-001",
      "stock_quantity": 4
    }
  ],
  "recent_orders": [
    {
      "id": 15,
      "total_amount": 8497,
      "created_at": "2026-05-31T10:00:00Z"
    }
  ]
}
```

---

# Products

## GET /products

Retrieve all products.

### Request

```http
GET /api/v1/products
```

### Response

```json
[
  {
    "id": 1,
    "name": "Wireless Mouse",
    "sku": "MOU-001",
    "price": 1499,
    "stock_quantity": 25
  }
]
```

---

## GET /products/{id}

Retrieve a single product.

### Request

```http
GET /api/v1/products/1
```

---

## POST /products

Create a new product.

### Request

```http
POST /api/v1/products
Content-Type: application/json
```

```json
{
  "name": "Mechanical Keyboard",
  "sku": "KEY-001",
  "price": 3499,
  "stock_quantity": 20
}
```

### Response

```json
{
  "id": 2,
  "name": "Mechanical Keyboard",
  "sku": "KEY-001",
  "price": 3499,
  "stock_quantity": 20
}
```

---

## PUT /products/{id}

Update an existing product.

### Request

```http
PUT /api/v1/products/2
```

```json
{
  "name": "Mechanical Keyboard Pro",
  "price": 3999,
  "stock_quantity": 18
}
```

---

## DELETE /products/{id}

Delete a product.

### Request

```http
DELETE /api/v1/products/2
```

### Response

```json
{
  "success": true,
  "message": "Product deleted successfully."
}
```

---

# Customers

## GET /customers

Retrieve all customers.

### Request

```http
GET /api/v1/customers
```

### Response

```json
[
  {
    "id": 1,
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210"
  }
]
```

---

## GET /customers/{id}

Retrieve a single customer.

### Request

```http
GET /api/v1/customers/1
```

---

## POST /customers

Create a customer.

### Request

```http
POST /api/v1/customers
```

```json
{
  "full_name": "Sarah Wilson",
  "email": "sarah@example.com",
  "phone": "+91 9123456789"
}
```

---

## PUT /customers/{id}

Update a customer.

### Request

```http
PUT /api/v1/customers/1
```

---

## DELETE /customers/{id}

Delete a customer.

### Response

```json
{
  "success": true,
  "message": "Customer deleted successfully."
}
```

---

# Orders

## GET /orders

Retrieve all orders.

### Request

```http
GET /api/v1/orders
```

### Response

```json
[
  {
    "id": 1,
    "customer_id": 1,
    "total_amount": 8497,
    "created_at": "2026-05-31T10:00:00Z"
  }
]
```

---

## GET /orders/{id}

Retrieve order details.

### Request

```http
GET /api/v1/orders/1
```

---

## POST /orders

Create a new order.

### Request

```http
POST /api/v1/orders
Content-Type: application/json
```

```json
{
  "customer_id": 1,
  "items": [
    {
      "product_id": 1,
      "quantity": 2
    },
    {
      "product_id": 2,
      "quantity": 1
    }
  ]
}
```

### Response

```json
{
  "id": 10,
  "customer_id": 1,
  "total_amount": 6497
}
```

---

## DELETE /orders/{id}

Delete an order.

### Response

```json
{
  "success": true,
  "message": "Order deleted successfully."
}
```

---

# Common Error Responses

## Validation Error

```json
{
  "detail": [
    {
      "loc": ["body", "name"],
      "msg": "Field required",
      "type": "missing"
    }
  ]
}
```

## Resource Not Found

```json
{
  "detail": "Resource not found."
}
```

## Insufficient Stock

```json
{
  "detail": "Insufficient stock available."
}
```

## Internal Server Error

```json
{
  "detail": "Internal server error."
}
```

---

# API Summary

| Resource  | Endpoint          | Methods          |
| --------- | ----------------- | ---------------- |
| Dashboard | `/dashboard`      | GET              |
| Products  | `/products`       | GET, POST        |
| Product   | `/products/{id}`  | GET, PUT, DELETE |
| Customers | `/customers`      | GET, POST        |
| Customer  | `/customers/{id}` | GET, PUT, DELETE |
| Orders    | `/orders`         | GET, POST        |
| Order     | `/orders/{id}`    | GET, DELETE      |

---

Generated for Inventory Order Management System v1.0.0
