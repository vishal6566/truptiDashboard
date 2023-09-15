import React from 'react'
import "../Styles/shipContainer.css"
import {MdLocalShipping} from "react-icons/md"
import { Spinner } from '@chakra-ui/react'
const ShipContainer = ({updateOrder,loading}) => {
  return (
    <div className='shipContainer'>
        <div onClick={updateOrder}>{loading?<Spinner color='red.500' />:"SHIP ORDER"}</div>
       <div>
        <MdLocalShipping size={22} />Pending Shipment
       </div>
    </div>
  )
}

export default ShipContainer