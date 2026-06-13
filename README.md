# 🥦 FreshCart - Full Stack Grocery Marketplace

<p align="center">
  <img src="https://img.shields.io/badge/MERN%20Stack-3C873A?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/React%2019-61dbfb?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/Redux%20Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white"/>
  <img src="https://img.shields.io/badge/TailwindCSS%20v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express%205-black?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens&logoColor=white"/>
  <img src="https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white"/>
  <img src="https://img.shields.io/badge/Cloudinary-2E78F0?style=for-the-badge&logo=cloudinary&logoColor=white"/>
  <img src="https://img.shields.io/badge/Framer%20Motion-EE44AA?style=for-the-badge&logo=framer&logoColor=white"/>
  <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white"/>
  <img src="https://img.shields.io/badge/Multer-FFCA28?style=for-the-badge&logo=node.js&logoColor=black"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/PRs-Welcome-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Made%20With-Love❤️-red?style=for-the-badge"/>
</p>

🚀 **Live Application:** [https://freshcart-snowy.vercel.app/](https://freshcart-snowy.vercel.app/)

Welcome to the complete monorepo for **FreshCart**, a production-ready, full-stack grocery marketplace.  
This MERN stack system is designed to be **scalable, secure, and feature-rich**, supporting 3 major user roles.

---

## 🧩 Architecture

This repository contains two primary applications:

| Folder      | Description                                     |
| ----------- | ----------------------------------------------- |
| `/Backend`  | Backend REST API (Node.js + Express + MongoDB)  |
| `/Frontend` | Frontend SPA (React + Redux Toolkit + Tailwind) |

---

## 👥 User Roles

| Role            | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| 🛒 **Customer** | Browse, filter, purchase products, manage cart, checkout      |
| 🏪 **Seller**   | Manage product listings, inventory, and order fulfillment     |
| 🛠 **Admin**    | Approve sellers, manage categories, oversee platform activity |

---

## ✨ Key Features

### ✅ Customer-Facing Features

- Persistent hybrid cart (localStorage + DB)
- Instant client-side filtering & search
- Multi-step secure checkout with **Stripe payments**
- Order history & item-level status tracking
- Full address CRUD system

### ✅ Seller Dashboard

- Role-based protected dashboard
- Seller approval flow (pending → approved)
- Full product CRUD with separate image upload endpoint
- Order panel — sees only their own items
- Update order item statuses

### ✅ Admin Dashboard

- Stateless admin login
- Approve/Reject seller applications
- Category CRUD with validation & image support
- Full marketplace order access and overrides

### ✅ Core Technical Features

- JWT access + refresh tokens (Secure httpOnly cookies)
- Isolated role-based auth flows (user / seller / admin)
- Automatic Axios token refresh & retry
- **Stripe** payment integration
- Cloudinary media storage w/ cleanup logic
- Atomic stock decrementing with MongoDB `$inc`
- Order data snapshot (immutable history)
- Redux Toolkit for scalable state management
- **Framer Motion** page & component animations
- Joi schema validation on all API inputs
- Global error handling middleware

---

## 🧰 Full Tech Stack

### Frontend `/Frontend`

| Technology        | Purpose                     |
| ----------------- | --------------------------- |
| React 19 + Vite 7 | UI Framework & build tool   |
| React Router v7   | Routing & layouts           |
| Redux Toolkit     | Global state management     |
| Axios             | API requests + interceptors |
| Tailwind CSS v4   | Styling (Vite plugin)       |
| Framer Motion     | Animations & transitions    |
| React-Hot-Toast   | Toast notifications         |
| React Icons       | Icon library                |

---

### Backend `/Backend`

| Technology             | Purpose                             |
| ---------------------- | ----------------------------------- |
| Node.js + Express 5    | API server (ESM modules)            |
| MongoDB + Mongoose     | Database & ODM                      |
| JWT + bcrypt           | Authentication & password hashing   |
| Stripe                 | Payment processing                  |
| Cloudinary             | Media storage & cleanup             |
| Multer                 | File upload handling                |
| Joi                    | Request schema validation           |
| cookie-parser / dotenv | Cookie parsing & environment config |
| cors                   | Cross-origin resource sharing       |

---

## 📁 Folder Structure

### Backend `/Backend`

```
/Backend
├── vercel.json
└── src/
    ├── config/
    │   ├── cloudinaryConfig.js   # Cloudinary SDK setup
    │   ├── cookiesConfig.js      # httpOnly cookie options
    │   ├── joiSchema.js          # Joi validation schemas
    │   └── stripeConfig.js       # Stripe SDK setup
    ├── controllers/
    │   ├── address.controller.js
    │   ├── admin.controller.js
    │   ├── cart.controller.js
    │   ├── category.controller.js
    │   ├── order.controller.js
    │   ├── product.controller.js
    │   ├── seller.controller.js
    │   └── user.controller.js
    ├── db/                       # MongoDB connection
    ├── middlewares/
    │   ├── auth.middleware.js
    │   ├── errorHandling.middleware.js
    │   ├── isSellerApproved.middleware.js
    │   ├── multer.middleware.js
    │   ├── validation.middleware.js
    ├── models/
    │   ├── address.model.js
    │   ├── cart.model.js
    │   ├── category.model.js
    │   ├── order.model.js
    │   ├── product.model.js
    │   ├── seller.model.js
    │   └── user.model.js
    ├── routes/
    │   ├── address.route.js
    │   ├── admin.route.js
    │   ├── cart.route.js
    │   ├── category.route.js
    │   ├── order.route.js
    │   ├── product.route.js
    │   ├── seller.route.js
    │   └── user.route.js
    ├── utils/
    │   ├── ApiError.js
    │   ├── ApiResponse.js
    │   ├── asyncHandler.js
    │   └── cloudinary.js
    ├── app.js                    # Express app setup
    └── index.js                  # Server entry point
```

### Frontend `/Frontend`

```
/Frontend
├── vite.config.js
├── vercel.json
└── src/
    ├── api/
    │   ├── adminApi.js
    │   ├── sellerApi.js
    │   └── userApi.js
    ├── app/                      # Redux store
    ├── assets/                   # Images, icons
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── Login.jsx
    │   ├── ProductCard.jsx
    │   ├── ProtectedRoute.jsx
    │   ├── MainBanner.jsx
    │   ├── Categories.jsx
    │   ├── BestSeller.jsx
    │   ├── BottomBanner.jsx
    │   ├── Loading.jsx
    │   ├── admin/                # Admin-specific components
    │   └── seller/               # Seller-specific components
    ├── context/                  # AppContext (toast/navigate)
    ├── features/
    │   ├── auth/                 # Auth slice (user/seller/admin)
    │   ├── cart/                 # Cart slice
    │   ├── products/             # Products slice
    │   └── ui/                   # UI state slice
    ├── pages/
    │   ├── Home.jsx
    │   ├── AllProducts.jsx
    │   ├── ProductDetails.jsx
    │   ├── ProductCategory.jsx
    │   ├── Cart.jsx
    │   ├── Order.jsx
    │   ├── Addresses.jsx
    │   ├── AddAddress.jsx
    │   ├── EditAddressDetails.jsx
    │   ├── UserProfile.jsx
    │   ├── EditUserDetails.jsx
    │   ├── ChangeUserPassword.jsx
    │   ├── ViewSeller.jsx
    │   ├── Contact.jsx
    │   ├── PageNotFound.jsx
    │   ├── admin/                # Admin pages
    │   └── seller/               # Seller pages
    ├── constants.js
    ├── App.jsx                   # Main router setup
    └── main.jsx                  # React entry point
```

---

## ⚙️ Local Setup & Installation

### 1️⃣ Backend Setup (`/Backend`)

```bash
cd Backend
npm install
```

Create a `.env` file:

```env
PORT=8000
CORS_ORIGIN=http://localhost:5173

MONGODB_URI=your_connection_string_here

ACCESS_TOKEN_SECRET=...
REFRESH_TOKEN_SECRET=...
ADMIN_TOKEN_SECRET=...

ADMIN_EMAIL=admin@freshcart.com
ADMIN_PASSWORD_HASH=hashed_password_here

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

Start Backend:

```bash
# Development (with nodemon)
npm run server

# Production
npm start
```

✅ Backend running at: `http://localhost:8000`

---

### 2️⃣ Frontend Setup (`/Frontend`)

```bash
cd Frontend
npm install
```

Add a `.env` file:

```env
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

The frontend connects directly to the backend using the `cors` package. The backend reads `CORS_ORIGIN` from `.env` and allows requests from the frontend origin:

```js
// Backend — app.js
import cors from "cors";

app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // http://localhost:5173
    credentials: true, // required for httpOnly cookies
  }),
);
```

All API requests from the frontend must point to the backend URL directly (e.g. `http://localhost:8000/api/v1/...`). No proxy setup is needed.

Start Frontend:

```bash
npm run dev
```

✅ Frontend running at: `http://localhost:5173`

---

### 🚀 Activation Steps (Full Flow)

| Step                     | Action                         |
| ------------------------ | ------------------------------ |
| 1️⃣ Run API & Frontend    | start both dev servers         |
| 2️⃣ Admin Login           | `/admin` with .env credentials |
| 3️⃣ Register Seller       | `/seller` register             |
| 4️⃣ Admin Approves Seller | admin dashboard                |
| 5️⃣ Seller Adds Product   | seller dashboard               |
| 6️⃣ Customer Shops        | browse → cart → checkout       |
| 7️⃣ Stripe Payment        | secure card payment            |
| 8️⃣ ✅ Order completes    | cart merges + stock decrements |

---

## 🎯 Summary

FreshCart is a production-grade MERN platform that includes:

✔ Multi-role authentication (Customer / Seller / Admin)  
✔ Stripe payment integration  
✔ Framer Motion animations  
✔ Cloud storage & cleanup (Cloudinary)  
✔ Atomic stock handling  
✔ Full CRUD admin dashboard  
✔ Seller onboarding workflow  
✔ Persistent hybrid cart logic  
✔ Joi schema validation on all inputs

---

## 📄 License

ISC License © Jashan Maan
