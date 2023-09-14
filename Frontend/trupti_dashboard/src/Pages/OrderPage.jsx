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
  useColorMode
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import axios from "axios";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { useSearchParams,useNavigate } from "react-router-dom";
import { API, getPageFromUrl } from "../utils/functionsAndimage";
import LoadingComponent from "../Components/LoadingComponent";
import PageNavigator from "../Components/PageNavigator";
import EmptyContainer from "../Components/EmptyContainer";
const OrderPage = () => {
  const {colorMode}=useColorMode()
  const navigate=useNavigate()
  const [err, setErr] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = getPageFromUrl(searchParams.get("page"));
  const [page, setPage] = useState(initialPage);
  const  [allOrders, setAllOrders] = useState([]);
  const [unshippedOrders,setUnshippedOrders]=useState([])
  const [loading,setLoading]=useState(true)
  const [showFilter,setShowFilter]=useState("")
  const headers={
    'Content-Type': 'application/json',
    'authorization': `Bearer ${localStorage.getItem("USER-TOKEN")}`, 
  }
  const handleGetOrders = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        `${API}/api/v1/order/all?page=${page}`,
        {
         headers:headers
        }
      );
setAllOrders(res.data.orders)
      setOrderItems(res.data.orders);
      setUnshippedOrders(res.data.unshippedOrders)
      setErr(false);
    } catch (err) {
      setErr(true);
      console.log(err);
    }finally{
      setLoading(false)
    }
  };
const handleFilter=(type)=>{
  if(type==="All"){
    setOrderItems(allOrders)
    setShowFilter("All")
  }else if(type==="Not Shipped"){
   setOrderItems(unshippedOrders);
   setShowFilter("Not Shipped")

  }
}
const hasMoreData = orderItems.length > 0;
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
              Filter: {showFilter}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleFilter("All")}>All</MenuItem>
              <MenuItem onClick={() => handleFilter("Not Shipped")}>Not Shipped</MenuItem>
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
    {loading?<LoadingComponent />:<Tbody>
    {orderItems.length===0?<EmptyContainer title={err?"PLEASE SIGNIN!" :"NO ORDERS"}
            info={err?"Navigate to Signin page by clicking on logout button":"No more orders to show"} />: 
            orderItems&&orderItems.map((order) => (
             
               <Tr onClick={()=>getSingleOrderId(order._id)}
               key={order._id} 
                    className="orderBlock"
                    style={{ backgroundColor: order.shipped ? "#edf2f7" : "",color:colorMode === 'light' ? ' black' : 'teal' }}
                    
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
     
    </Tbody>}
    
  </Table>
</TableContainer>
      </div>
      <div>  {showFilter==="Not Shipped"?<div></div>:<PageNavigator hasMoreData={hasMoreData} page={page} setPage={setPage} />}</div>
    </div>
  )
}

export default OrderPage