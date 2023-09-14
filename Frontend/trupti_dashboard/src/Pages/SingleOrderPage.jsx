import React, { useEffect, useState } from 'react'
import "../Styles/singleOrderPage.css"
import axios from "axios";
import { useParams } from 'react-router-dom';
import {Heading} from "@chakra-ui/react";
import {ArrowBackIcon} from "@chakra-ui/icons";
import {Link} from "react-router-dom";
import { useColorMode } from '@chakra-ui/react';
import ShipContainer from '../Components/ShipContainer';
import TrackShipmentContainer from '../Components/TrackShipmentContainer';
import { useToast } from "@chakra-ui/react";
const SingleOrderPage = () => {
  const toast=useToast()
  const {colorMode}=useColorMode()
  const {id}=useParams();
  const [order,setOrder]=useState({})
  const [shipped,setShipped]=useState(false)
  const getOrderData=async()=>{
    try{
      let res=await axios.get(`http://localhost:4000/api/v1/order/${id}`,{withCredentials:true})
      
      setOrder(res.data.order)
    }catch(err){
      console.log(err)
    }
  }
const updateOrderStatus=async()=>{
  const id=order._id;
  try{
    const res=await axios.put(`http://localhost:4000/api/v1/order/${id}/shipped`,{withCredentials:true});
    setShipped(res.data.order.shipped)
    toast({
      title: `Hurray! Order Is Shipped.`,

      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }
  catch(err){
    toast({
      title: 'Some Error Occured.',
description:"Order Is Not Shipped.",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  }
}


  useEffect(()=>{
    getOrderData()
  },[id])
  const containerStyle = {
    backgroundColor: colorMode === 'light' ? ' #e2e8f0' : '#2d3748',
   };
  return (
    <div>
      <div className='singleOrderPageHeaderContainer'>
      <Link to="/home/orders">   <div className='backOption'><ArrowBackIcon mb="2px" mr="4px"/>Back to orders</div></Link>
        <div className='headerContainer'>
       <div className='userInfoContainer'>
       <div >
          <Heading >Order for</Heading>
          <Heading className='nameBlock'>{order.user&&order.user.name}</Heading>
         </div>
         <div >
          <p>order total:</p>
          <p>₹{order.totalPrice&&order.totalPrice}</p>
          </div>
       </div>
       <div className='shippingInfoContainer' >
<div style={containerStyle}>
  <p>Order Date</p>
  <p>{order.createdAt&&order.createdAt.trim().split("T")[0]}</p>
</div>
<div style={containerStyle}>
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

      {shipped ?<TrackShipmentContainer />: <ShipContainer updateOrder={updateOrderStatus} /> }
    </div>
  )
}

export default SingleOrderPage