
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import LandingPage from './Pages/LandingPage';

function App() {
  return (
    <ChakraProvider>
  <LandingPage />
  </ChakraProvider>
  );
}

export default App;
