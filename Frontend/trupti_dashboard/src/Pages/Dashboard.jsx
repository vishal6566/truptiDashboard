import React, { useEffect, useState } from "react";
import "../Styles/dashboard.css";
import { Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { API } from "../utils/functionsAndimage";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
const Dashboard = () => {
  const [orders, setOrders] = useState({});
  const [loading,setLoading]=useState(false)
  const headers={
    'Content-Type': 'application/json',
    'authorization': `Bearer ${localStorage.getItem("USER-TOKEN")}`, 
  }
  const handleGetOrders = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${API}/api/v1/order/all`, {
        headers:headers
      });

      setOrders(res.data);
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(true)
    }
  };
  useEffect(() => {
    handleGetOrders();
  }, []);

  return (
    <div className="dashboardContainer">
      <div className="bannerContainer">
        <Heading color="white">Trupti Shiprocket Dashboard.</Heading>
        <div>
          <Link to="/home/items">
            <div className="linkBtn">Food Items</div>
          </Link>
          <Link to="/home/orders">
            <div className="linkBtn">View Orders</div>
          </Link>
        </div>
      </div>
      <div className="overviewBlock">
        <div>Overview</div>
        <div>
          <div>
            <p>All Orders</p>
            <p>{loading?<Spinner color='teal.500' />:orders.totalOrdersCount}</p>
          </div>
          <div>
            <p>Total Order Value</p>
            <p>₹ {loading?<Spinner color='teal.500' />: orders.totalAmount}</p>
          </div>
          <div>
            <p>Orders To Be Shipped</p>
            <p>{loading?<Spinner color='teal.500' />: orders.unshippedOrdersCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
