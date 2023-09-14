import React, { useEffect, useState } from "react";
import "../Styles/dashboard.css";
import { Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
const Dashboard = () => {
  const [orders, setOrders] = useState({});

  const handleGetOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/order/all`, {
        withCredentials: true,
      });

      setOrders(res.data);
    } catch (err) {
      console.log(err);
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
            <p>{orders.totalOrdersCount && orders.totalOrdersCount}</p>
          </div>
          <div>
            <p>Total Order Value</p>
            <p>₹ {orders.totalAmount && orders.totalAmount}</p>
          </div>
          <div>
            <p>Orders To Be Shipped</p>
            <p>{orders.unshippedOrdersCount && orders.unshippedOrdersCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
