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
  const page=parseInt(req.query.page) || 1;
  const limit=10;
  const skip=(page-1)*limit;
  const totalOrders=await Order.find();
  const totalOrdersCount = await Order.countDocuments();
  const unshippedOrdersCount = await Order.countDocuments({ shipped: false });
  const unshippedOrders=await Order.find({shipped:false}).populate("user", "name").sort({createdAt:-1});
  const orders = await Order.find().populate("user", "name").skip(skip).limit(limit).sort({ createdAt: -1 });

  let totalAmount = 0;
  totalOrders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    totalOrdersCount,
    unshippedOrdersCount,
    unshippedOrders,
    orders
  });
});

//get single order

exports.getSingleOrder = catchAsyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name");

  if (!order) {
    return next(new ErrorHandler("Order not found"), 404);
  }
  res.status(200).json({
    success: true,
    order,
  });
});

//update shipped status

exports.updateOrderStatus = catchAsyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found"), 404);
  }
  order.shipped = true;
  await order.save();
  res.status(200).json({
    success: true,
    order,
  });
});
