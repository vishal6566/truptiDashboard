import React from 'react'
import {MdLocalShipping} from "react-icons/md"
import "../Styles/trackShipmentContainer.css"
const TrackShipmentContainer = () => {
  return (
    <div className='trackContainer'>
        <div>TRACK SHIPMENT</div>
        <div>
            <div>LABEL</div>
            <div>MANIFEST</div>
        </div>
       <div>
        <MdLocalShipping size={22} />Order Shipped
       </div>
    </div>
  )
}

export default TrackShipmentContainer