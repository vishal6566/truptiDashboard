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
import LoadingComponent from "../Components/LoadingComponent";
import { API } from '../utils/functionsAndimage';
const SingleOrderPage = () => {
  const [btnLoading,setBtnLoading]=useState(false)
  const toast=useToast()
  const {colorMode}=useColorMode()
  const {id}=useParams();
  const [order,setOrder]=useState({})
  const [loading,setLoading]=useState(true)
  const headers={
    'Content-Type': 'application/json',
    'authorization': `Bearer ${localStorage.getItem("USER-TOKEN")}`, 
  }
  const getOrderData=async()=>{
    setLoading(true)
    try{
      let res=await axios.get(`${API}/api/v1/order/${id}`,{headers:headers})
      
      setOrder(res.data.order)
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }
const updateOrderStatus=async()=>{
  const id=order._id;
  setBtnLoading(true)
  try{
    const res=await axios.put(`${API}/api/v1/order/${id}/shipped`,{withCredentials:true});
    
    setOrder({ ...order, shipped: res.data.order.shipped});
    toast({
      title: `Hurray! Order Is Shipped.`,

      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setBtnLoading(false)
  }
  catch(err){
    
    toast({
      title: 'Some Error Occured.',
description:"Order Is Not Shipped.",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
    setBtnLoading(false)
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
          <p>Order Total:</p>
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
      
      
   {loading?<LoadingComponent />:<div className='orderListContainer'>
      {order.orderItems && order.orderItems.map((order)=>(
          <div className='orderCard' key={order._id}>
          <img src={order.img} alt="" />
        <p className='itemName'>{order.name}</p>
        <p className='itemPrice'>₹ {order.price}</p>
        <div className='itemQuantity'>{order.quantity}</div>
        </div>
      ))}
      </div>}  
    

      {order.shipped && order.shipped ?<TrackShipmentContainer />: <ShipContainer updateOrder={updateOrderStatus} loading={btnLoading} /> }
    </div>
  )
}

export default SingleOrderPage