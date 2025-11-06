import express from "express";
import { errorHandling } from "./middlewares/errorHandling.middleware.js";
import cookieParser from "cookie-parser";
import { handleStripeWebhook } from "./controllers/order.controller.js";

const app = express();

app.post(
  "/api/v1/orders/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

// Setting Up Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Setting Up Routes
import userRouter from "./routes/user.route.js";
app.use("/api/v1/users", userRouter);

import sellerRouter from "./routes/seller.route.js";
app.use("/api/v1/sellers", sellerRouter);

import adminRoute from "./routes/admin.route.js";
app.use("/api/v1/admin", adminRoute);

import categoryRoute from "./routes/category.route.js";
app.use("/api/v1/categories", categoryRoute);

import productRoute from "./routes/product.route.js";
app.use("/api/v1/products", productRoute);

import addressRoute from "./routes/address.route.js";
app.use("/api/v1/addresses", addressRoute);

import cartRoute from "./routes/cart.route.js";
app.use("/api/v1/cart", cartRoute);

import orderRoute from "./routes/order.route.js";
app.use("/api/v1/orders", orderRoute);

// Error Handling Middleware
app.use(errorHandling);

export default app;
