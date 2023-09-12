import React from 'react'
import {Card,CardBody,Heading} from "@chakra-ui/react"
const EmptyCartItem = () => {
  return (
    <div><Card>
    <CardBody>
      <Heading size="md">Your cart is empty!</Heading>
    </CardBody>
  </Card></div>
  )
}

export default EmptyCartItem