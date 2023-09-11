
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import LandingPage from './Pages/LandingPage';
import SideNavbar from './Pages/SideNavbar';
import { Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import Dashboard from './Pages/Dashboard';
import CartPage from './Pages/CartPage';
import OrderPage from './Pages/OrderPage';
import FoodItemsPage from './Pages/FoodItemsPage';
function App() {
  return (
    <ChakraProvider>
<Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />}>
          <Route index element={<Dashboard />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="items" element={<FoodItemsPage />} />
          
        </Route>
      </Routes>
  </ChakraProvider>
  );
}

export default App;
