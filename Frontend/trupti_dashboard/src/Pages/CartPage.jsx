import React, { useState } from "react";
import "../Styles/cartpage.css";
import {
  useToast,
  Heading,
  FormControl,
  Button,
  Input,
} from "@chakra-ui/react";
import CartPageCard from "../Components/CartPageCard";
import axios from "axios";
import { API } from "../utils/functionsAndimage";
import EmptyContainer from "../Components/EmptyContainer";
const CartPage = () => {
  const toast = useToast();
  const getInitialCart = () => {
    const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
    return initialCart.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
      product: item._id,
    }));
  };

  const [cart, setCart] = useState(getInitialCart);

  //shipping information
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
  });
  //function for shippinginfo info
  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };
  //function to update the cart
  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  //function for update of quantity of specific item
  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedCart = cart.map((item) => {
      if (item._id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    updateCart(updatedCart);
  };
  //increment quantity function
  const handleIncrement = (itemId) => {
    const updatedcart = cart.map((item) => {
      if (item._id === itemId) {
        const newQuantity = item.quantity + 0 + 1;
        handleQuantityChange(item._id, newQuantity);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    updateCart(updatedcart);
  };

  //decrement quantity function
  const handleDecrement = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item._id === itemId && item.quantity > 1) {
        const newQuantity = item.quantity - 1;
        handleQuantityChange(item._id, newQuantity);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    updateCart(updatedCart);
  };
  //deleting a item from cart
  const handleRemoveItem = (itemId) => {
    const updatedCart = cart.filter((item) => item._id !== itemId);
    updateCart(updatedCart);
    toast({
      title: `Item deleted Successfully`,
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };
  //price of each item according to quantity
  const calculateItemPrice = (item) => {
    return (item.price || 0) * (item.quantity || 1);
  };
  //cart total amount
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      return total + calculateItemPrice(item);
    }, 0);
  };
  //Function for place order
  const headers={
    'Content-Type': 'application/json',
    'authorization': `Bearer ${localStorage.getItem("USER-TOKEN")}`, 
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        shippingInfo: shippingInfo,
        orderItems: cart,
        totalPrice: calculateTotalAmount(),
      };
      const res = await axios.post(
        `${API}/api/v1/order/new`,
        orderData,
        { headers:headers}
      );
      if (res.status === 201) {
        toast({
          title: `order placed successfully`,
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        updateCart([]);
        setShippingInfo({ ...shippingInfo, city: "", address: "" });
      } else {
        toast({
          title: `Failed to place order. Please try again.`,
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      }
    } catch (err) {
      let message = err.response.data.message;
      toast({
        title: "Failed to place order",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="cartContainer">
      <div className="cartItemsList">
        <div className="cartTitle">Cart Items: ₹{calculateTotalAmount()}</div>
        <div className="cartListContainer">
     
        {cart.length===0?<EmptyContainer title="YOUR CART IS EMPTY! " info="Please go to Food Items section and add Food Items to cart." /> :cart.map((item) => (
            <CartPageCard
              key={item._id}
              item={item}
              handleDecrement={handleDecrement}
              handleIncrement={handleIncrement}
              handleRemoveItem={handleRemoveItem}
              calculateItemPrice={calculateItemPrice}
            />
          ))}
    
        </div>
      </div>
      <div className="shippingContainer">
        <div className="shippingTitle">Shipping Address</div>
        <form onSubmit={handlePlaceOrder}>
          <FormControl>
            <Heading as="h4" size="md" mt={5}>
              Add your shipping details
            </Heading>

            <Input
              type="text"
              placeholder="Enter your Address"
              name="address"
              value={shippingInfo.address}
              onChange={handleShippingInfoChange}
              mt={5}
            />

            <Input
              type="text"
              placeholder="Enter your City"
              name="city"
              value={shippingInfo.city}
              onChange={handleShippingInfoChange}
              mt={5}
            />

            <Button colorScheme="red" mt={5} w="100%" type="submit">
              Place Order
            </Button>
          </FormControl>
        </form>
      </div>
    </div>
  );
};

export default CartPage;
