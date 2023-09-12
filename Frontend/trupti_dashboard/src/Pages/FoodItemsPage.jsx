import React, { useEffect, useState } from "react";
import "../Styles/fooditems.css";
import axios from "axios";
import {
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  Button,
  Card,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
const FoodItemsPage = () => {
  const [items, setItems] = useState([]);
  const getAllItems = async () => {
    await axios
      .get("http://localhost:4000/api/v1/allproducts", {
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
  }, []);

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
    </div>
  );
};

export default FoodItemsPage;
