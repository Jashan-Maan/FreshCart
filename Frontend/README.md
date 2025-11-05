# 🥦 FreshCart - The Frontend

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/Redux%20Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white"/>
  <img src="https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"/>
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
  <img src="https://img.shields.io/badge/npm-CC0000?style=for-the-badge&logo=npm&logoColor=white"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React%20Hot%20Toast-FFB703?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"/>
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black"/>
</p>

Welcome to the **FreshCart Frontend Repository!**  
This is the complete client-side application for the **FreshCart Grocery Marketplace**, a modern, high-performance **Single Page Application (SPA)** built with **Vite**, **Redux Toolkit**, and **Tailwind CSS**.

---

## 🚀 Overview

FreshCart is not just a single "store" — it’s a comprehensive **multi-sided platform** with **three distinct user roles**, each having its own dedicated interface and logic:

### 🛒 Customer Store

A feature-rich, public-facing e-commerce platform that allows:

- Browsing and filtering products
- Managing a persistent cart (guest or logged-in)
- Secure checkout with a smooth shopping experience

### 🏪 Seller Dashboard

A secure, protected portal for approved sellers:

- Add, edit, and manage products
- Manage inventory
- View and process incoming orders

### 🛠️ Admin Dashboard

An internal-facing control panel for administrators:

- Manage product categories
- Approve/reject seller applications
- Monitor all orders across the marketplace

---

## ✨ Key Features

### 🧠 Modern State Management

Built with **Redux Toolkit (RTK)** for scalable and maintainable global state.

- **authSlice:** Manages authentication for all three roles (`isSeller`, `isAdmin`).
- **productSlice:** Caches product data to minimize redundant API calls.
- **cartSlice:** Implements a hybrid cart — localStorage for guests, synced database cart for logged-in users.
- **uiSlice:** Manages non-persistent UI states like modals and search bar input.

### 🔐 Persistent & Context-Aware Login

- Sessions are automatically restored using secure HTTP-only cookies.
- On app start, the `AppContextProvider` detects the current section (`/admin`, `/seller`, or `/`) and validates the session accordingly.
- Prevents multiple role logins at once.

### 🌐 Smart API Clients

- Custom **Axios** instances: `userApi`, `sellerApi`, and `adminApi`.
- Automatic token refresh: interceptors handle expired tokens silently and retry failed requests — ensuring a seamless UX.

### 🧭 Declarative & Role-Based Routing

- Built with **React Router DOM**.
- **Protected Routes** redirect guests to the login modal.
- **Nested Layouts** provide consistent dashboards for Sellers and Admins using `<Outlet />`.

### 💅 Fully Responsive & Component-Based UI

- Styled with **Tailwind CSS** using a mobile-first approach.
- Clean, reusable components such as:
  - `<ProductCard />`
  - `<Login />`
  - `<Navbar />`
- Responsive design ensures usability across all devices.

---

## 🧰 Tech Stack

| Category         | Technology                                 |
| ---------------- | ------------------------------------------ |
| **Core**         | React 18, Vite                             |
| **State & Data** | Redux Toolkit, React-Redux, Axios          |
| **Routing**      | React Router DOM                           |
| **Styling & UI** | Tailwind CSS, React Hot Toast, React Icons |

---

## ⚙️ Getting Started

### ✅ Prerequisites

- **Node.js v18+**
- **npm** or **yarn**
- **FreshCart Backend API** (must be running locally)

---

### 🧩 Installation

```bash
# 1. Clone the repository
git clone https://github.com/Jashan-Maan/FreshCart-Frontend.git

# 2. Navigate to the project directory
cd FreshCart-Frontend

# 3. Install dependencies
npm install
```

## 🔧 Local Configuration (Vite Proxy)

To prevent CORS errors during development, create a `vite.config.js` file in your project root:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/v1": {
        target: "http://localhost:8000", // Backend API URL
        changeOrigin: true,
      },
    },
    port: 5173,
  },
});
```

## ▶️ Running the Application

Make sure your backend server is running, then start the frontend:

```bash
# Start the development server
npm run dev
```

Your app will be live at:
👉 http://localhost:5173 ↗

## 📁 Folder Structure

```bash
src/
├── api/              # Axios instances with interceptors
│       ├── userApi.js
│       ├── sellerApi.js
│       └── adminApi.js
│
├── app/              # Redux store configuration
│      └── store.js
│
├── assets/           # Static assets (logos, images)
│
├── components/       # Reusable UI components
│       ├── admin/
│       ├── seller/
│       ├── Navbar.jsx
│       ├── Footer.jsx
│       ├── ProductCard.jsx
│       ├── Login.jsx
│       └── ProtectedRoute.jsx
│
├── context/          # Global utilities and context providers
│   └── AppContext.jsx
│
├── features/         # Redux slices
│   ├── auth/
│   ├── cart/
│   ├── products/
│   └── ui/
│
├── pages/            # Top-level route pages
│   ├── admin/
│   ├── seller/
│   └── (user)/
│
├── App.jsx           # App routes and session logic
└── main.jsx          # React entry point (Provider + Context)
```

## 🧮 Available Scripts

| Command           | Description                                     |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Start the Vite development server (with HMR)    |
| `npm run build`   | Create an optimized production build in `/dist` |
| `npm run preview` | Preview the production build locally            |

## 🧱 Build & Deployment

To build for production:

```bash
# Build for production
npm run build
```

To test your production build locally:

```bash
# Preview the production build locally
npm run preview
```

## 🧑‍💻 Author

I
Built with ❤️ using React, Redux Toolkit, and Tailwind CSS

---
