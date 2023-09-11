import React from 'react'
import SideNavbar from './SideNavbar'

import "../Styles/homepage.css"

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