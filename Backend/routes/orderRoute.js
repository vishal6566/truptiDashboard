const express = require("express");
const { createOrder } = require("../controller/orderController");
const { isAuthenticatedUser } = require("../middlewares/auth");

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser,createOrder);

module.exports = router;
