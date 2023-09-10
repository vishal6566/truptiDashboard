const express = require("express");
const {
  createOrder,
  getAllOrders,
  getSingleOrder,
} = require("../controller/orderController");
const { isAuthenticatedUser } = require("../middlewares/auth");

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, createOrder);
router.route("/order/all").get(isAuthenticatedUser, getAllOrders);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
module.exports = router;
