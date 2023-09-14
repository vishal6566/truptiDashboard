import React from 'react'
import "../Styles/shipContainer.css"
import {MdLocalShipping} from "react-icons/md"
const ShipContainer = ({updateOrder}) => {
  return (
    <div className='shipContainer'>
        <div onClick={updateOrder}>SHIP ORDER</div>
       <div>
        <MdLocalShipping size={22} />Pending Shipment
       </div>
    </div>
  )
}

export default ShipContainer