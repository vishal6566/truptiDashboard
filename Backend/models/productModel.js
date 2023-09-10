const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add product name."],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Please add product price."],
  },
  img: {
    type: String,
    required: [true, "Please enter product img url."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
