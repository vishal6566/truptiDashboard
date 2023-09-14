import React, { useState } from "react";
import "../Styles/sideNavbar.css";
import { Link,useNavigate  } from "react-router-dom";
import { BiHomeAlt, BiSolidExit } from "react-icons/bi";
import { IoFastFoodOutline } from "react-icons/io5";
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdNightlightRound } from "react-icons/md";
import { BsFillSunFill, BsFillCartFill } from "react-icons/bs";
import axios from "axios";

import { useToast,useColorMode,Heading} from "@chakra-ui/react";

const SideNavbar = () => {
 
  const {toggleColorMode,colorMode}=useColorMode();
const toast=useToast();
const navigate=useNavigate();
  const handleDayAndNight = () => {
   toggleColorMode();
  };
  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/logout", {
        withCredentials: true,
      })
      .then((res) => {
        let message=res.data.message;
        toast({
          title:message,
          description:"You will be redirected to Signin page" ,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        setTimeout(()=>{
          navigate("/")
        },1000)
      })
      .catch((err) => {
        toast({
          title: 'Logout Failed',
          description: "Some error occurred while logging out.",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      });
  };
  const containerStyle = {
    backgroundColor: colorMode === 'light' ? 'white' : 'black',
   };
  return (
    <div className="navbarContainer">
      <div>
        <div>
          <div className="sidebarTitle">
            <Heading size='md'  marginTop="20px">Trupti Treats</Heading>
          </div>
          <Link to="/home">
            <div className="sidebarOption">
              <BiHomeAlt size={20} />
              <p>Dashboard</p>
            </div>
          </Link>
          <Link to="/home/items">
            {" "}
            <div className="sidebarOption">
              <IoFastFoodOutline size={20} />
              <p>Food Items</p>
            </div>
          </Link>
          <Link to="/home/cart">
            <div className="sidebarOption">
              <BsFillCartFill size={20} />
              <p>Cart</p>
            </div>
          </Link>

          <Link to="/home/orders">
            <div className="sidebarOption">
              <FaArrowTrendUp size={16} />
              <p>Orders</p>
            </div>
          </Link>

       
        </div>
        <div>
          <div className="sidebarFooterIcons">
            <div onClick={handleLogout}>
              {" "}
              <BiSolidExit size={20} color="white" />
            </div>
            <div onClick={handleDayAndNight}  style={containerStyle}>
              {colorMode ==="light" ? (
                
                <MdNightlightRound size={20} />
              ) : (
                <BsFillSunFill size={20} style={{ backgroundColor: 'black'}} />
              )}
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
