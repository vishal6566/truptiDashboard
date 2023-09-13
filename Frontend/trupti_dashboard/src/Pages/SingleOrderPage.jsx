import React, { useEffect, useState } from 'react'
import "../Styles/singleOrderPage.css"
import axios from "axios";
import { useParams } from 'react-router-dom';
import {Heading} from "@chakra-ui/react";
import {ArrowBackIcon} from "@chakra-ui/icons";
import {Link} from "react-router-dom"
const SingleOrderPage = () => {
  const {id}=useParams();
  const [order,setOrder]=useState({})
  const getOrderData=async()=>{
    try{
      let res=await axios.get(`http://localhost:4000/api/v1/order/${id}`,{withCredentials:true})
      console.log(res.data.order)
      setOrder(res.data.order)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    getOrderData()
  },[id])
  return (
    <div>
      <div className='singleOrderPageHeaderContainer'>
      <Link to="/home/orders">   <div className='backOption'><ArrowBackIcon mb="2px" mr="4px"/>Back to orders</div></Link>
        <div className='headerContainer'>
       <div className='userInfoContainer'>
       <div >
          <Heading color="black">Order for</Heading>
          <Heading>{order.user&&order.user.name}</Heading>
         </div>
         <div >
          <p>order total:</p>
          <p>₹{order.totalPrice&&order.totalPrice}</p>
          </div>
       </div>
       <div className='shippingInfoContainer'>
<div>
  <p>Order Date</p>
  <p>{order.createdAt&&order.createdAt.trim().split("T")[0]}</p>
</div>
<div>
  <p>Order Address</p>
  <p>{order.shippingInfo&&order.shippingInfo.address},{order.shippingInfo&&order.shippingInfo.city}</p>
</div>
       </div>
        </div>
      </div>
      
      
      <div className='orderListContainer'>
      {order.orderItems && order.orderItems.map((order)=>(
          <div className='orderCard' key={order._id}>
          <img src={order.img} alt="" />
        <p className='itemName'>{order.name}</p>
        <p className='itemPrice'>₹ {order.price}</p>
        <div className='itemQuantity'>{order.quantity}</div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default SingleOrderPage