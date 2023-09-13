import React, { useState } from "react";
import "../Styles/sideNavbar.css";
import { Link,useNavigate  } from "react-router-dom";
import { BiHomeAlt, BiSolidExit } from "react-icons/bi";
import { IoFastFoodOutline } from "react-icons/io5";
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdNightlightRound } from "react-icons/md";
import { BsFillSunFill, BsFillCartFill } from "react-icons/bs";
import axios from "axios";

import {
 
  useToast
} from "@chakra-ui/react";

const SideNavbar = () => {
  const [day, setDay] = useState(true);
const toast=useToast();
const navigate=useNavigate();
  const handleDayAndNight = () => {
    setDay(!day);
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
 
  return (
    <div className="navbarContainer">
      <div>
        <div>
          <div className="sidebarTitle">
            <h1>Trupti Treats</h1>
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
            <div onClick={handleDayAndNight}>
              {day ? (
                <BsFillSunFill size={20} />
              ) : (
                <MdNightlightRound size={20} />
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
