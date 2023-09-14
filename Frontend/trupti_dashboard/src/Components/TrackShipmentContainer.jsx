import React from 'react'
import {MdLocalShipping} from "react-icons/md"
import "../Styles/trackShipmentContainer.css"
import { useToast } from '@chakra-ui/react'
const TrackShipmentContainer = () => {
  const toast=useToast()
  const handleAlert=()=>{

      toast({
        title: 'SORRY! CANNOT ACCESS THIS FEATURE.',
        description: "Feature Under Development.",
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
  
  }
  return (
    <div className='trackContainer'>
        <div onClick={ handleAlert}>TRACK SHIPMENT</div>
        <div>
            <div onClick={ handleAlert}>LABEL</div>
            <div onClick={ handleAlert}>MANIFEST</div>
        </div>
       <div>
        <MdLocalShipping size={22} />Order Shipped
       </div>
    </div>
  )
}

export default TrackShipmentContainer