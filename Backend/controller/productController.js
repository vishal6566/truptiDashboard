const Product = require("../models/productModel");
const catchAsyncHandler = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
//creating a product

exports.createProduct = catchAsyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//get all products

exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});
