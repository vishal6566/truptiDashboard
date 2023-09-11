import React, { useState } from "react";
import "../Styles/sideNavbar.css";
import { Link } from "react-router-dom";
import { BiHomeAlt,BiSolidExit } from 'react-icons/bi'
import {IoFastFoodOutline} from "react-icons/io5"
import {FaArrowTrendUp}from "react-icons/fa6"
import {MdNightlightRound} from "react-icons/md"
import {BsFillSunFill, BsFillCartFill}from "react-icons/bs"

const SideNavbar = () => {
    const [day,setDay]=useState(true);

    const handleDayAndNight=()=>{
        setDay(!day)
    }
  return (
    <div className="navbarContainer">
      <div>
        <div>
        <div className="sidebarTitle">
          <h1>Trupti Treats</h1>
        </div>
        <Link to="/home"><div className="sidebarOption">
            <BiHomeAlt size={20} />
          <p>Dashboard</p>
        </div></Link>   
        <Link to="/home/items"> <div className="sidebarOption">
            <IoFastFoodOutline size={20}/>
          <p>Food Items</p>
        </div></Link>
       
        <Link to="/home/orders"><div className="sidebarOption">
            <FaArrowTrendUp size={16}/>
          <p>Orders</p>
        </div></Link>
        
        <Link to="/home/cart"><div className="sidebarOption">
            <BsFillCartFill size={20}/>
          <p>Cart</p>
        </div></Link>
        
        </div>
        <div>
          <div className="sidebarFooterIcons">

           <div> <BiSolidExit size={20} color="white" /></div> 
            <div onClick={handleDayAndNight}>
              
                {day?<BsFillSunFill size={20} />:  <MdNightlightRound size={20} /> }
            </div>
           
          </div>
          <div className="footer">

            <p>© 2023 Topbar</p>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default SideNavbar;
