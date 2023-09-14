import React, { useState } from "react";
import "../Styles/topnavbar.css"
import {
  Drawer,
  DrawerBody,
  useColorMode,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Stack,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import "../Styles/sideNavbar.css";
import { Link, useNavigate } from "react-router-dom";
import { BiHomeAlt, BiSolidExit } from "react-icons/bi";
import { IoFastFoodOutline } from "react-icons/io5";
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdNightlightRound } from "react-icons/md";
import { BsFillSunFill, BsFillCartFill } from "react-icons/bs";
import axios from "axios";

const TopNavbar = () => {
  const {toggleColorMode,colorMode}=useColorMode();
  const toast = useToast();
  const navigate = useNavigate();
  const containerStyle = {
    backgroundColor: colorMode === 'light' ? 'white' : 'black',
   };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const handleDayAndNight = () => {
    toggleColorMode();
  };
  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/logout", {
        withCredentials: true,
      })
      .then((res) => {
        let message = res.data.message;
        toast({
          title: message,
          description: "You will be redirected to Signin page",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        toast({
          title: "Logout Failed",
          description: "Some error occurred while logging out.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };
  return (
    <div className="topNavbarContainer">
  <div>
      <Button
        bg={colorMode==='light'?"#edf2f7":"#1a202c"}
        variant="outline"
        borderColor={colorMode==='light'?"#edf2f7":"white"}
        borderWidth="1px"
        onClick={onOpen}
      >
        <HamburgerIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        initialFocusRef={firstField}
        onClose={onClose}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Trupti Treats</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Link to="/home">
                <div className="sidebarOption" onClick={onClose}>
                  <BiHomeAlt size={20} />
                  <p>Dashboard</p>
                </div>
              </Link>
              <Link to="/home/items">
                {" "}
                <div className="sidebarOption" onClick={onClose}>
                  <IoFastFoodOutline size={20} />
                  <p>Food Items</p>
                </div>
              </Link>
              <Link to="/home/cart">
                <div className="sidebarOption" onClick={onClose}>
                  <BsFillCartFill size={20} />
                  <p>Cart</p>
                </div>
              </Link>

              <Link to="/home/orders">
                <div className="sidebarOption" onClick={onClose}>
                  <FaArrowTrendUp size={16} />
                  <p>Orders</p>
                </div>
              </Link>
            </Stack>
            <Stack mt="50px">
              <div>
                <div className="sidebarFooterIcons">
                  <div onClick={handleLogout}>
                    {" "}
                    <BiSolidExit size={20} color="white" onClick={onClose} />
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
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

    </div>
    <div>
      <Heading>Trupti Treats</Heading>
    </div>
    </div>
  
  );
};

export default TopNavbar;
