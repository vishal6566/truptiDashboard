import React from "react";
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
  useToast,
} from "@chakra-ui/react";


const FoodItemCard = ({ item, handleAddToCart }) => {


  return (
    <Card width="250px">
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
        <Button onClick={() => handleAddToCart(item)} variant="ghost" colorScheme="blue" w="100%">
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FoodItemCard;