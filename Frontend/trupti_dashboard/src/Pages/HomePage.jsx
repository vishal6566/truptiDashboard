import React from 'react'
import SideNavbar from './SideNavbar'
import AllRoutes from '../routes/AllRoutes'
import "../Styles/homepage.css"
import { Route,Routes } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard'
import FoodItemsPage from '../Pages/FoodItemsPage'
import OrderPage from '../Pages/OrderPage'
import CartPage from '../Pages/CartPage'
import { Outlet } from 'react-router-dom';
const HomePage = () => {
  return (
    <div className='homeContainer'>
        <div>
            <SideNavbar />
        </div>
        <div>
        
         <Outlet />
        </div>
    </div>
  )
}

export default HomePage