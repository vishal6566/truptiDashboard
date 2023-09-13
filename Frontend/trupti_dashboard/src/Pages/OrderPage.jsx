import React, { useEffect, useState } from "react";
import "../Styles/orderpage.css";
import {
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import axios from "axios";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { Link, useSearchParams,useNavigate } from "react-router-dom";
import { getPageFromUrl } from "../utils/functionsAndimage";

import PageNavigator from "../Components/PageNavigator";
import EmptyContainer from "../Components/EmptyContainer";
const OrderPage = () => {
  const navigate=useNavigate()
  const [err, setErr] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = getPageFromUrl(searchParams.get("page"));
  const [page, setPage] = useState(initialPage);
  
  const handleGetOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/order/all?page=${page}`,
        {
          withCredentials: true,
        }
      );

      setOrderItems(res.data.orders);
      setErr(false);
    } catch (err) {
      setErr(true);
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetOrders();
    setSearchParams({ page });
    window.scrollTo(0, 0);
  }, [page]);
  const getSingleOrderId=(id)=>{
navigate(`${id}`)
  }
  return (
    <div>
      <div className="orderTitleContainer">
        <Heading className="orderTitle">Orders</Heading>
        <div>
          <Menu>
            <MenuButton className="filterBtn" as={Button} rightIcon={<ChevronDownIcon />}>
              Filter:
            </MenuButton>
            <MenuList>
              <MenuItem>All</MenuItem>
              <MenuItem>Not Shipped</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
      <div>
      <TableContainer>
  <Table variant='simple'>
   
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Date</Th>
        <Th>Amount</Th>
        <Th>Shipped</Th>
      </Tr>
    </Thead>
    <Tbody>
    {orderItems.length===0?<EmptyContainer title={err?"PLEASE SIGNIN!" :"NO ORDERS"}
            info={err?"Navigate to Signin page by clicking on logout button":"No more orders to show"} />: 
            orderItems &&orderItems.map((order) => (
             
               <Tr onClick={()=>getSingleOrderId(order._id)}
               key={order._id} 
                    className="orderBlock"
                    style={{ backgroundColor: order.shipped ? "#edf2f7" : "" }}
                    
                  >
                    <Td>{order.user.name}</Td>

                    <Td>{order.createdAt.trim().split("T")[0]}</Td>
                    <Td>{order.totalPrice}</Td>
                    <Td>
                      {order.shipped ? (
                        <ImCheckboxChecked color="#3182ce" />
                      ) : (
                        <ImCheckboxUnchecked />
                      )}
                    </Td>
                  </Tr>
                  
                ))}
     
    </Tbody>
    
  </Table>
</TableContainer>
      </div>
      <div>  {err?"": <PageNavigator page={page} setPage={setPage} />}</div>
    </div>
  )
}

export default OrderPage