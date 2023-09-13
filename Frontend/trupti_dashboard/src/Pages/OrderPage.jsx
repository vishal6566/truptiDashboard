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
import { useSearchParams } from "react-router-dom";
import { getPageFromUrl } from "../utils/functionsAndimage";

import PageNavigator from "../Components/PageNavigator";
import EmptyContainer from "../Components/EmptyContainer";
const OrderPage = () => {
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
      
      setOrderItems( res.data.orders);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetOrders();
    setSearchParams({ page });
    window.scrollTo(0, 0);
  }, [page]);
  console.log(orderItems);
  return (
    <div className="orderContainer">
      <div className="orderTitleContainer">
        <Heading className="orderTitle">Orders</Heading>
        <div>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Filter:
            </MenuButton>
            <MenuList>
              <MenuItem>All</MenuItem>
              <MenuItem>Not Shipped</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
      <div className="orderListContainer">
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Date</Th>
                <Th>Amount</Th>
                <Th>Shipped</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orderItems.length===0?<EmptyContainer title="NO MORE ORDER TO SHOW." info="Please go to previous page." />:orderItems &&
                orderItems.map((order) => (
                  <Tr
                    className="orderBlock"
                    style={{ backgroundColor: order.shipped ? "#edf2f7" : "" }}
                    key={order._id}
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
    <PageNavigator page={page} setPage={setPage} />
    </div>
  );
};

export default OrderPage;
