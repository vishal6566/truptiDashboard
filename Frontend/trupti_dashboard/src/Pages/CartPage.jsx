import React,{useState} from "react";
import "../Styles/cartpage.css";

import CartPageCard from "../Components/CartPageCard";

const CartPage = () => {
  const getInitialCart = () => {
    const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
    return initialCart.map((item) => ({ ...item, quantity: item.quantity || 1 }));
  };
  console.log(getInitialCart())
  const [cart, setCart] = useState(getInitialCart);

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
    updateCart(updatedCart)
  };
  //increment quantity function
  const handleIncrement=(itemId)=>{
const updatedcart=cart.map((item)=>{
  if(item._id===itemId){
    const newQuantity=(item.quantity+0)+1;
    handleQuantityChange(item._id,newQuantity)
    return {...item,quantity:newQuantity};
  }
  return item;
})
updateCart(updatedcart);
  }

  //decrement quantity function
  const handleDecrement=(itemId)=>{
    const updatedCart=cart.map((item)=>{
      if(item._id===itemId && item.quantity>1){
        const newQuantity=item.quantity-1;
        handleQuantityChange(item._id,newQuantity);
        return {...item,quantity:newQuantity};
      };
      return item;
    });
    updateCart(updatedCart)
  }
  //deleting a item from cart
const handleRemoveItem=(itemId)=>{
  const updatedCart=cart.filter((item)=>item._id!==itemId)
  updateCart(updatedCart);
}
  return (
    <div className="cartContainer">
      <div className="cartItemsList">
        <div className="cartTitle">Cart Items</div>
        <div className="cartListContainer">
         {cart.map((item)=>(
          <CartPageCard item={item} handleDecrement={handleDecrement} handleIncrement={handleIncrement}handleRemoveItem={handleRemoveItem} />
         ))}
        </div>
      </div>
      <div className="shippingContainer">shipping</div>
    </div>
  );
};

export default CartPage;
