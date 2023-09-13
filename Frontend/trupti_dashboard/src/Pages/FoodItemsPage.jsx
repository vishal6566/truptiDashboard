import React, { useEffect, useState } from "react";
import "../Styles/fooditems.css";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { getPageFromUrl } from "../utils/functionsAndimage";
import EmptyContainer from "../Components/EmptyContainer";
import FoodItemCard from "../Components/FoodItemsCard";
import { useToast } from "@chakra-ui/react";
import PageNavigator from "../Components/PageNavigator";
const FoodItemsPage = () => {
  const toast = useToast();
  const [cartItems, setCartItems] = useState([]);
  const [items, setItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = getPageFromUrl(searchParams.get("page"));
  const [page, setPage] = useState(initialPage);

  //get all items function
  const getAllItems = async () => {
    await axios
      .get(`http://localhost:4000/api/v1/allproducts?page=${page}`, {
        withCredentials: true,
      })
      .then((res) => {
        let data = res.data.products;
        setItems(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(items.length);
  //add to cart function
  const handleAddToCart = (item) => {
    const isItemPresent = cartItems.some((el) => el._id === item._id);
    if (!isItemPresent) {
      const updatedCart = [...cartItems, item];
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast({
        title: `${item.name} is successfully added to cart.`,

        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: `${item.name} is alerady present in your cart.`,

        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getAllItems();
    setSearchParams({ page });
    window.scrollTo(0, 0);
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCartItems(savedCart);
    }
  }, [page]);
  console.log(items);
  return (
    <div className="mainItemsContainer">
      <div className="itemsTitle">Food Items</div>
      <div className="itemsContainer">
        {items.length === 0 ? (
          <EmptyContainer
            title="NO MORE FOOD ITEMS TO SHOW"
            info="Please go to previous page."
          />
        ) : (
          items &&
          items.map((item) => (
            <FoodItemCard
              key={item._id}
              handleAddToCart={handleAddToCart}
              item={item}
            />
          ))
        )}
      </div>
      <PageNavigator page={page} setPage={setPage} />
    </div>
  );
};

export default FoodItemsPage;
