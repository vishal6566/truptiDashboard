const User=require("../models/userModel");
const catchAsyncHandler=require("../middlewares/catchAsyncError");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler=require("../utils/errorhandler")

//Register a user

exports.registerUser=catchAsyncHandler(async(req,res,next)=>{
    const {name,email,password}=req.body;

    const user= await User.create({
        name,email,password
    });
 
    const token = user.getJWTToken();
    res.status(201).json({
        success: true,
        user,
        token,
      });
})

//login a user

exports.loginUser=catchAsyncError(async(req,res,next)=>{

    const {email,password}=req.body;

    if(!email || !password){
        next(new ErrorHandler("Please Enter email & password",400));
    }
    //checking if user has given both email and password

    const user=await User.findOne({email}).select("+password")

    if(!user){
        next(new ErrorHandler("Invalid email or password",401))
    }

    const isPasswordMatched=await user.comparePassword(password);
      
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))
    }
    const token = user.getJWTToken();
    res.status(200).json({
        success: true,
        user,
        token,
      });
})