const express = require("express");
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));
//Routes imports
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");

app.use("/api/v1", userRoute);
app.use("/api/v1", productRoute);
app.use("/api/v1", orderRoute);
//middleware for error
app.use(errorMiddleware);

module.exports = app;
