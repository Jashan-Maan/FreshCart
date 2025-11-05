# 🥦 FreshCart - The Backend (API)

<p align= "center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white"/>
  <img src="https://img.shields.io/badge/Cloudinary-2E78F0?style=for-the-badge&logo=cloudinary&logoColor=white"/>
  <img src="https://img.shields.io/badge/Multer-FFCA28?style=for-the-badge&logo=node.js&logoColor=black"/>
  <img src="https://img.shields.io/badge/Postman-F36C3D?style=for-the-badge&logo=postman&logoColor=white"/>
  <img src="https://img.shields.io/badge/NPM-CB0000?style=for-the-badge&logo=npm&logoColor=white"/>
 </p>
 
<p align="center">
  <img src="https://img.shields.io/badge/REST%20API-008000?style=for-the-badge&logo=api&logoColor=white"/>
  <img src="https://img.shields.io/badge/Security-HTTPS%20%2B%20JWT%20%2B%20httpOnly%20Cookies-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Made%20With-Love❤️-red?style=for-the-badge"/>
</p>

Welcome to the **FreshCart Backend Repository!**  
This is the complete server-side application that powers the FreshCart Grocery Marketplace — a secure, scalable, and production-ready **REST API** built using **Node.js**, **Express**, and **MongoDB**.

This backend serves as the **central engine** for a multi-role platform supporting:

- 👤 Customers
- 🏪 Sellers
- 🛠️ Admins

---

## ✨ Key Features

### 🔐 Three-Role Authentication System

- **Separate login flows:** User, Seller & Admin
- **JWT Authentication** (Access Token + Refresh Token)
- **httpOnly & Secure Cookies**
- **Refresh token rotation** for continuous sessions
- **Dedicated middleware per role**  
  (`authenticateUser`, `authenticateSeller`, `authenticateAdmin`)

### 🛒 Full E-Commerce Logic

- Persistent **database cart**
- Order creation with **data snapshotting**
- **Atomic inventory updates** using MongoDB `$inc`
- Complete **order workflow** for users, sellers, and admins

### ☁️ Cloud File Management

- Uploads via **Multer**
- Permanent storage in **Cloudinary**
- **Automatic cleanup** of replaced/deleted images

### 🛡️ Robust Security & Validation

- **Joi validation** on all inputs
- Prevents NoSQL injection & invalid input data
- **Centralized error handling**
- Custom `ApiError` & `ApiResponse` classes

---

## 🧰 Tech Stack

| Category         | Technology          | Purpose                         |
| ---------------- | ------------------- | ------------------------------- |
| Runtime          | Node.js             | JavaScript backend engine       |
| Framework        | Express.js          | Routing & middleware            |
| Database         | MongoDB + Mongoose  | Flexible data modeling          |
| Auth             | JWT + Cookies       | Secure role-based login         |
| Password Hashing | bcrypt.js           | Secure encrypted authentication |
| File Upload      | Multer              | Upload handler                  |
| File Storage     | Cloudinary          | CDN storage for images          |
| Validation       | Joi                 | Request body validation         |
| Middleware       | cookie-parser, cors | Cookies & CORS                  |
| Environment      | dotenv              | Environment config              |

---

## ⚙️ Getting Started

### ✅ Prerequisites

- Node.js **v18+**
- npm / yarn
- MongoDB Atlas OR Local MongoDB
- Cloudinary Account

---

### 🧩 Installation

```bash
# Clone the repository
git clone https://github.com/Jashan-Maan/FreshCart-Backend.git

# Navigate into project directory
cd FreshCart-Backend

# Install dependencies
npm install
```

## 🔧 Environment Configuration

Create a .env file:

```bash
# Server
PORT=8000
CORS_ORIGIN=http://localhost:5173

# Database
MONGODB_URI=your_mongodb_connection_string_here

# JWT
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
ADMIN_TOKEN_SECRET=your_admin_token_secret

# Admin login (password must be hashed)
ADMIN_EMAIL=admin@freshcart.com
ADMIN_PASSWORD_HASH=your_bcrypt_hash_here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

## ▶️ Running the Server

Start the development server:

```bash
npm run dev
```

## 📖 API Overview

All endpoints are prefixed with: `/api/v1`

👤 User Auth

| Method | Endpoint                    | Auth    | Description           |
| ------ | --------------------------- | ------- | --------------------- |
| POST   | `/users/register`           | ❌      | Register customer     |
| POST   | `/users/login`              | ❌      | Login customer        |
| POST   | `/users/logout`             | ✅      | Logout customer       |
| GET    | `/users/refresh-token`      | Refresh | Issue new token       |
| GET    | `/users/me`                 | ✅      | Get profile           |
| PATCH  | `/users/me/details`         | ✅      | Update profile Info   |
| PATCH  | `/users/me/avatar`          | ✅      | Update profile Avatar |
| PATCH  | `/users/me/change-password` | ✅      | Update Password       |

🏪 Seller Auth

| Method | Endpoint                      | Auth    | Description                       |
| ------ | ----------------------------- | ------- | --------------------------------- |
| POST   | `/sellers/register`           | ❌      | Register seller (Pending)         |
| POST   | `/sellers/login`              | ❌      | Login seller                      |
| POST   | `/sellers/logout`             | ✅      | Logout seller                     |
| GET    | `/seller/refresh-token`       | Refresh | Refresh token                     |
| GET    | `/sellers/me`                 | ✅      | Seller profile                    |
| PATCH  | `/sellers/me/details`         | ✅      | Update seller profile Info        |
| PATCH  | `/sellers/me/storeImage`      | ✅      | Update seller profile Store Image |
| PATCH  | `/sellers/me/change-password` | ✅      | Update seller Password            |

🛠️ Admin

| Method | Endpoint                    | Auth | Description             |
| ------ | --------------------------- | ---- | ----------------------- |
| POST   | `/admin/login`              | ❌   | Admin login             |
| POST   | `/admin/logout`             | ✅   | Admin logout            |
| GET    | `/admin/auth`               | ✅   | Verify admin            |
| GET    | `/sellers`                  | ✅   | To View pending sellers |
| PATCH  | `/admin/sellers/:id/status` | ✅   | Approve/deny seller     |

🍎 Products

| Method | Endpoint                | Auth            | Description     |
| ------ | ----------------------- | --------------- | --------------- |
| POST   | `/products`             | Seller Approved | Create product  |
| GET    | `/products`             | Public          | List products   |
| GET    | `/products/:id`         | Public          | Product details |
| PATCH  | `/products/:id/details` | Seller Owner    | Update details  |
| PATCH  | `/products/:id/images`  | Seller Owner    | Replace images  |
| DELETE | `/products/:id`         | Seller Owner    | Delete product  |
| GET    | `/sellers/me/products`  | Seller          | My products     |

📦 Categories

| Method | Endpoint          | Auth   | Description             |
| ------ | ----------------- | ------ | ----------------------- |
| POST   | `/categories`     | Admin  | Create                  |
| GET    | `/categories`     | Public | List                    |
| GET    | `/categories/:id` | Admin  | Details                 |
| PATCH  | `/categories/:id` | Admin  | Update & replace image  |
| DELETE | `/categories/:id` | Admin  | Delete (only if unused) |

🛒 Cart

| Method | Endpoint           | Auth | Description     |
| ------ | ------------------ | ---- | --------------- |
| POST   | `/cart`            | User | Add/Update item |
| GET    | `/cart`            | User | Get cart        |
| DELETE | `/cart/:productId` | User | Remove one item |
| DELETE | `/cart`            | User | Clear cart      |

🧾 Orders

| Method | Endpoint                      | Auth   | Description         |
| ------ | ----------------------------- | ------ | ------------------- |
| POST   | `/orders`                     | User   | Place order         |
| GET    | `/orders`                     | User   | Get order history   |
| GET    | `/orders/:id`                 | User   | Single order        |
| GET    | `/orders/seller`              | Seller | Seller order list   |
| PATCH  | `/orders/:id/item/:productId` | Seller | Update item status  |
| GET    | `/orders/admin`               | Admin  | View all orders     |
| PATCH  | `/orders/:id`                 | Admin  | Update order status |

🏠 Addresses

| Method | Endpoint         | Auth | Description      |
| ------ | ---------------- | ---- | ---------------- |
| POST   | `/addresses`     | User | Add new address  |
| GET    | `/addresses`     | User | List addresses   |
| GET    | `/addresses/:id` | User | Single addresses |
| PATCH  | `/addresses/:id` | User | Update           |
| DELETE | `/addresses/:id` | User | Delete           |

## 📁 Folder Structure

```bash
src/
├── config/         # DB & Cloudinary config
├── controllers/    # API business logic
│       ├── user.controller.js
│       ├── seller.controller.js
│       ├── admin.controller.js
│       ├── product.controller.js
│       ├── category.controller.js
│       ├── cart.controller.js
│       ├── order.controller.js
│       └── address.controller.js
├── db/             # MongoDB connection
├── middlewares/
│       ├── auth.middleware.js
│       ├── isSellerApproved.middleware.js
│       ├── validation.middleware.js
│       ├── multer.middleware.js
│       └── error.middleware.js
├── models/         # Mongoose schemas
│       ├── user.model.js
│       ├── cart.model.js
│       ├── order.model.js
│       ├── product.model.js
│       ├── category.model.js
│       ├── seller.model.js
│       └── address.model.js
├── routes/         # Route definitions
│       ├── user.route.js
│       ├── admin.route.js
│       ├── cart.route.js
│       ├── order.route.js
│       ├── product.route.js
│       ├── category.route.js
│       ├── seller.route.js
│       └── address.route.js
├── utils/          # Helpers
│   ├── asyncHandler.js
│   ├── ApiError.js
│   ├── ApiResponse.js
│   └── cloudinary.js
├── app.js          # Express app config
└── index.js        # Server entry
```

## 🧑‍💻 Author

I
Built with ❤️ using Node.js, Express, and MongoDB

---
