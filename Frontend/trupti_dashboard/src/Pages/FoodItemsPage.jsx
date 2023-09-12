import React, { useEffect, useState } from "react";
import "../Styles/fooditems.css";
import axios from "axios";
import {
  Image,Stack,Heading,Text,Divider,Button,Card,CardBody,CardFooter} from "@chakra-ui/react";
import {useSearchParams} from "react-router-dom"
import {  getPageFromUrl } from "../utils/functionsAndimage";
import {ArrowBackIcon,ArrowForwardIcon} from "@chakra-ui/icons"
const FoodItemsPage = () => {
  const [items, setItems] = useState([]);
  const [searchParams,setSearchParams]=useSearchParams();
  const initialPage=getPageFromUrl(searchParams.get("page"))
  const [page, setPage] = useState(initialPage);
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
  useEffect(() => {
    getAllItems();
    setSearchParams({ page });
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="mainItemsContainer">
      <div className="itemsTitle">Food Items</div>
      <div className="itemsContainer">
        {items &&
          items.products &&
          items.products.map((item) => (
            <Card width="250px" key={item._id}>
              <CardBody>
                <Image src={item.img} borderRadius="sm" />
                <Stack mt="2" spacing="1">
                  <Heading size="sm">{item.name}</Heading>

                  <Text color="blue.600" fontSize="md">
                    ₹ {item.price}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <Button variant="ghost" colorScheme="blue" w="100%">
                  Add to cart
                </Button>
              </CardFooter>
            </Card>
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
