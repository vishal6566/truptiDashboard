const express=require('express');
const errorMiddleware = require("./middlewares/error")
const cookieParser=require("cookie-parser")
const app=express();

app.use(express.json());
app.use(cookieParser())
//Routes imports
const user=require("./routes/userRoute")


app.use("/api/v1",user)

//middleware for error
app.use(errorMiddleware)

module.exports=app;