const express=require('express');
const errorMiddleware = require("./middlewares/error")
const app=express();

app.use(express.json());

//Routes imports
const user=require("./routes/userRoute")


app.use("/api/v1",user)

//middleware for error
app.use(errorMiddleware)

module.exports=app;