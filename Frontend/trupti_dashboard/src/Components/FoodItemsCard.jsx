import React, { useState,useEffect } from "react";
import "../Styles/foodItemCard.css"
import {
 
  
  Heading,
  Text,
  Divider,
  Button,
 

} from "@chakra-ui/react";


const FoodItemCard = ({ item, handleAddToCart }) => {
  

  return (
    <div className="foodItemCardContainer">
      <div>
        <img src={item.img} borderRadius="sm" />
        
          <Heading size="sm">{item.name}</Heading>
          <Text color="blue.600" fontSize="md">
            ₹ {item.price}
          </Text>
        
      </div>
      <Divider />
    
        <Button onClick={() => handleAddToCart(item)} variant="ghost" colorScheme="blue" w="100%">
          Add to cart
        </Button>
   
      </div>
  );
};

export default FoodItemCard;