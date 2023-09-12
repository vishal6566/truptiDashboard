import React from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Image,
    Stack,
    Heading,
    Button,
    Text,
  } from "@chakra-ui/react";
const CartPageCard = ({item,handleDecrement,handleIncrement,handleRemoveItem}) => {
  return (
    <div>
         <Card key={item._id}
           direction={{ base: "column", sm: "row" }}
           overflow="hidden"
           variant="outline"
         >
           <Image
             objectFit="cover"
             maxW={{ base: "60%", sm: "150px" }}
             src={item.img}
             alt="Caffe Latte"
           />

           <Stack>
             <CardBody>
               <Heading size="md">{item.name}</Heading>
               <Text mt="2"> ₹ {item.price}</Text>
             </CardBody>

             <CardFooter>
               <Button variant="solid" colorScheme="blue"onClick={()=>handleDecrement(item._id)}>
                 -
               </Button>
               <Button mx="2">{item.quantity || 1}</Button>
               <Button variant="solid" colorScheme="blue"onClick={()=>handleIncrement(item._id)}>
                 +
               </Button>
               <Button variant="solid" colorScheme="red" ml="3" onClick={()=>handleRemoveItem(item._id)}>
                 Delete
               </Button>
             </CardFooter>
           </Stack>
         </Card>
    </div>
  )
}

export default CartPageCard