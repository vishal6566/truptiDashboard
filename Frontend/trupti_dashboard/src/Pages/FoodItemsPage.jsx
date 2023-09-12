import React, { useEffect, useState } from "react";
import "../Styles/fooditems.css";
import axios from "axios";
import {useSearchParams} from "react-router-dom"
import {  getPageFromUrl } from "../utils/functionsAndimage";
import {ArrowBackIcon,ArrowForwardIcon} from "@chakra-ui/icons"
import FoodItemCard from "../Components/FoodItemsCard";
import { useToast,Button } from "@chakra-ui/react";
const FoodItemsPage = () => {
  const toast=useToast();
  const [cartItems,setCartItems]=useState([])
  const [items, setItems] = useState([]);
  const [searchParams,setSearchParams]=useSearchParams();
  const initialPage=getPageFromUrl(searchParams.get("page"))
  const [page, setPage] = useState(initialPage);
  
  //get all items function
  const getAllItems = async () => {
    await axios
      .get(`http://localhost:4000/api/v1/allproducts?page=${page}`, {
        withCredentials: true,
      })
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
//add to cart function
const handleAddToCart=(item)=>{
  
  const isItemPresent=cartItems.some((el)=>el._id===item._id);
  if(!isItemPresent){
    const updatedCart=[...cartItems,item];
    setCartItems(updatedCart)
    localStorage.setItem("cart",JSON.stringify(updatedCart))
    toast({
      title: `${item.name} is successfully added to cart.`,
      
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }
  else{
    toast({
      title: `${item.name} is alerady present in your cart.`,
      
      status: 'error',
      duration: 2000,
      isClosable: true,
    })
  }
}

  useEffect(() => {
    getAllItems();
    setSearchParams({ page });
    window.scrollTo(0, 0);
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCartItems(savedCart);
    }
   
  }, [page]);

  return (
    <div className="mainItemsContainer">
      <div className="itemsTitle">Food Items</div>
      <div className="itemsContainer">
        {items &&
          items.products &&
          items.products.map((item) => (
            <FoodItemCard key={item._id} handleAddToCart={handleAddToCart} item={item} />
          ))}
      </div>
      <div className="pageNavigator">
     <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
       <ArrowBackIcon mr={5}/>   Previous
      </Button>
      <Button>{page}</Button>
      <Button disabled={page >= 3} onClick={() => setPage(page + 1)}>
       Next  <ArrowForwardIcon  ml={5} />
      </Button>
     </div>
    </div>
  );
};

export default FoodItemsPage;
