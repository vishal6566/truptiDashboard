const catchAsyncHandler=require("../middlewares/catchAsyncError");
const Order=require("../models/orderModel");
const ErrorHandler = require("../utils/errorhandler");

//creating a order

exports.createOrder=catchAsyncHandler(async(req,res,next)=>{
    const {shippingInfo,orderItems,totalPrice}=req.body;
 
    const order=await Order.create({
        shippingInfo,
        orderItems,
        totalPrice,
        user:req.user._id,
      
    });
    res.status(201).json({
        success:true,
        order,
    });
});