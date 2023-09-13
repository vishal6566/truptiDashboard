import React from 'react'
import SideNavbar from '../Components/SideNavbar'
import TopNavbar from "../Components/TopNavbar"
import "../Styles/homepage.css"

import { Outlet } from 'react-router-dom';
const HomePage = () => {
  return (
    <div className='homeContainer'>
        <div>
           <div className='sideNavbar'><SideNavbar /></div> 
           <div className='topNavbar'><TopNavbar /> </div>
        </div>
        <div>
        
         <Outlet />
        </div>
    </div>
  )
}

export default HomePage