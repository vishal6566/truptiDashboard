const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: [true, "Please enter your address."],
    },
    city: {
      type: String,
      required: [true, "Please enter your city."],
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required:true,
     
      },
      price: {
        type: Number,
        required: true,
      },
      img: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
 
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  shipped: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
