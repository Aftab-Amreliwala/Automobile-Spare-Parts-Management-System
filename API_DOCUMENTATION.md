# 📡 API Documentation — Automobile Spare Parts Management System

**Base URL:** `http://localhost:3000/api`  
**Database:** MongoDB (local)  
**Framework:** Express.js  
**Admin Panel:** Angular (localhost:4200)  
**Frontend Store:** Angular (localhost:23398) 

---

## 📁 Categories API

### Get All Categories
```
GET /api/category
```
**Response:**
```json
[
  {
    "_id": "64abc123",
    "categoryId": "CAT01",
    "categoryName": "Brakes",
    "photo": "1714900000000.jpg"
  }
]
```

---

### Add Category
```
POST /api/category
Content-Type: multipart/form-data
```
**Request Body:**
| Field | Type | Description |
|---|---|---|
| categoryId | String | Unique category ID |
| categoryName | String | Name of category |
| photo | File | Category image (optional) |

**Response:**
```json
{ "message": "Category Added" }
```

---

### Update Category
```
PUT /api/category/:id
Content-Type: application/json
```
**Request Body:**
```json
{
  "categoryId": "CAT01",
  "categoryName": "Brakes Updated"
}
```
**Response:**
```json
{ "message": "Category Updated" }
```

---

### Delete Category
```
DELETE /api/category/:id
```
**Response:**
```json
{ "message": "Category Deleted" }
```

---

## 📦 Products API

### Get All Products
```
GET /api/product
```
**Response:**
```json
[
  {
    "_id": "64xyz789",
    "category": "Brakes",
    "pname": "Brake Pad",
    "pdesc": "High quality brake pad",
    "price": 450,
    "qty": 25,
    "date": "2026-04-09",
    "photo": "1714900000001.jpg"
  }
]
```

---

### Add Product
```
POST /api/product
Content-Type: multipart/form-data
```
**Request Body:**
| Field | Type | Description |
|---|---|---|
| category | String | Category name |
| pname | String | Product name |
| pdesc | String | Product description |
| price | Number | Product price |
| qty | Number | Stock quantity |
| date | String | Date added |
| photo | File | Product image (optional) |

**Response:**
```json
{ 
  "message": "Product Added",
  "product": { "_id": "64xyz789", "pname": "Brake Pad" }
}
```

---

### Delete Product
```
DELETE /api/product/:id
```
**Response:**
```json
{ "message": "Product Deleted" }
```

---

## 🛒 Orders API

### Place Order
```
POST /api/order/create
Content-Type: application/json
```
**Request Body:**
```json
{
  "name": "Rahul Shah",
  "phone": "9876543210",
  "address": "Surat, Gujarat",
  "items": [
    {
      "pname": "Brake Pad",
      "price": 450,
      "quantity": 2
    }
  ],
  "totalAmount": 900
}
```
**Response:**
```json
{ "message": "Order saved successfully ✅" }
```

---

### Get All Orders (Admin)
```
GET /api/order
```
**Response:**
```json
[
  {
    "_id": "64order1",
    "name": "Rahul Shah",
    "phone": "9876543210",
    "address": "Surat, Gujarat",
    "items": [{ "pname": "Brake Pad", "price": 450, "quantity": 2 }],
    "totalAmount": 900,
    "createdAt": "2026-04-09T12:00:00.000Z"
  }
]
```

---

## 🔐 Admin Auth API

### Admin Login
```
POST /api/login
Content-Type: application/json
```
**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```
**Response (Success):**
```json
{ "message": "Login success", "admin": { "_id": "...", "email": "admin@example.com" } }
```
**Response (Failure):**
```json
{ "message": "Invalid credentials" }
```

---

## ⚠️ Error Responses

| Status Code | Meaning |
|---|---|
| 200 | Success |
| 201 | Created |
| 401 | Unauthorized |
| 500 | Server Error |

---

## 🔮 Future Scope
- JWT-based authentication for secure admin access
- Password hashing using bcrypt
- Product update (PUT) endpoint
- Pagination for products and orders
- Input validation middleware

---

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **File Upload:** Multer
- **Port:** 3000
