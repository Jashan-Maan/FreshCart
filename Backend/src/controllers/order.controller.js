import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Cart } from "../models/cart.model.js";
import { Address } from "../models/address.model.js";
import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";

export const addOrder = asyncHandler(async (req, res) => {
  const { addressId, paymentMethod } = req.body;

  if (!addressId || !paymentMethod) {
    throw new ApiError(400, "Address ID and Payment Method are required");
  }

  const cart = await Cart.findOne({ user: req.user._id }).populate({
    path: "items.product",
    select: "name price offerPrice seller stockQuantity",
  });

  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, "Your cart is empty");
  }

  const address = await Address.findById(addressId);

  if (!address) {
    throw new ApiError(404, "Address not found");
  }

  for (const item of cart.items) {
    if (item.quantity > item.product.stockQuantity) {
      throw new ApiError(400, `Not enough stock for ${item.product.name}`);
    }
  }

  let subtotal = 0;
  const orderItems = cart.items.map((item) => {
    const itemPrice = item.product.offerPrice || item.product.price;
    subtotal += itemPrice * item.quantity;
    return {
      product: item.product._id,
      seller: item.product.seller,
      name: item.product.name,
      price: itemPrice,
      quantity: item.quantity,
    };
  });

  const shippingFee = 0;
  const taxes = 0;
  const platformFee = subtotal * 0.05;
  const totalAmount = subtotal + shippingFee + taxes + platformFee;

  const order = await Order.create({
    user: req.user._id,
    items: orderItems,
    totalAmount,
    shippingAddress: {
      recipientName: address.recipientName,
      recipientPhone: address.recipientPhone,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
    },
    paymentMethod,
    paymentStatus: "Pending",
    orderStatus: "Pending",
  });

  for (const item of cart.items) {
    await Product.findByIdAndUpdate(item.product._id, {
      $inc: { stockQuantity: -item.quantity },
    });
  }

  cart.items = [];
  await cart.save();

  return res
    .status(201)
    .json(new ApiResponse(201, order, "Order placed Successfully"));
});

export const getAllOrdersOfUser = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate({
      path: "items.product",
      select: "name images category offerPrice price",
      populate: {
        path: "category",
        select: "name",
      },
    })
    .populate({ path: "items.seller", select: "storeName" })
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders retrieved successfully"));
});

export const getSingleOrderOfUser = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findOne({ _id: orderId, user: req.user._id });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order retrieved successfully"));
});

export const getSellerOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ "items.seller": req.seller._id })
    .populate({
      path: "items.product",
      select: "name images category offerPrice price",
      populate: {
        path: "category",
        select: "name",
      },
    })
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders retrieved successfully"));
});

export const updateProductOrderStatus = asyncHandler(async (req, res) => {
  const { orderId, productId } = req.params;

  const { status } = req.body;
  if (!status) {
    throw new ApiError(400, "Status is required");
  }

  const order = await Order.findOne({
    _id: orderId,
    items: {
      $elemMatch: {
        product: productId,
        seller: req.seller?._id,
      },
    },
  });
  if (!order) {
    throw new ApiError(404, "Order not found or you are not authorized");
  }

  const itemIndex = order.items.findIndex(
    (item) => item.product.toString() === productId.toString()
  );

  if (itemIndex === -1) {
    throw new ApiError(404, "Item not found in order");
  }
  order.items[itemIndex].status = status;

  order.markModified("items");

  await order.save();

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order status updated successfully"));
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate("items.product", "name images")
    .populate("items.seller", "storeName")
    .populate("user", "name")
    .sort({ createdAt: -1 });
  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders retrieved successfully"));
});

export const UpdateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  order.orderStatus = req.body.orderStatus;

  await order.save();

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order status updated successfully"));
});
