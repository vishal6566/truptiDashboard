const catchAsyncHandler = require("../middlewares/catchAsyncError");
const Order = require("../models/orderModel");
const ErrorHandler = require("../utils/errorhandler");

//creating a order

exports.createOrder = catchAsyncHandler(async (req, res, next) => {
  const { shippingInfo, orderItems, totalPrice } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    totalPrice,
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    order,
  });
});

//get all orders

exports.getAllOrders = catchAsyncHandler(async (req, res, next) => {
  const orders = await Order.find().populate("user", "name");

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//get single order

exports.getSingleOrder = catchAsyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user","name");

  if (!order) {
    return next(new ErrorHandler("Order not found"), 404);
  }
  res.status(200).json({
    success: true,
    order,
  });
});
