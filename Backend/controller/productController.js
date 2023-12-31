const Product = require("../models/productModel");
const catchAsyncHandler = require("../middlewares/catchAsyncError");

//creating a product

exports.createProduct = catchAsyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//get all products

exports.getAllProducts = catchAsyncHandler(async (req, res, next) => {
  
  const page=parseInt(req.query.page) || 1;
  const limit=8;
  const skip=(page-1)*limit;
  
  const products = await Product.find().skip(skip).limit(limit);

  res.status(200).json({
    success: true,
    products,
  });
});
