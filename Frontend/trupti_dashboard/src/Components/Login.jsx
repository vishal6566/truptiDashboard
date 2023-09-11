import React, { useState } from "react";
import "../Styles/login.css";
import { loginBannerImage, logo } from "../utils/image";
import {
  FormControl,
  Button,
  Input,
  Heading,
  Text,
  Box,
  useToast
} from "@chakra-ui/react";
import SignUp from "./SignUp";
import axios from "axios";
const Login = () => {
  const toast = useToast()
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
   
    axios
      .post("http://localhost:4000/api/v1/login", loginData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        toast({
          title: 'SignIn Successfully',
          description: "You will be redireted to dashboard page.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      })
      .catch((err) => {
       let message=err.response.data.message;
       toast({
        title: 'SignIn Failed',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })

      });
      
  };

  return (
    <div className="container">
      <div className="loginContainer">
        <div>
          <div>
            <img src={logo} alt="logo" />
          </div>
          <div>
            <form onSubmit={handleLoginSubmit}>
              <FormControl>
                <Heading as="h4" size="md" mt={5}>
                  Sign In
                </Heading>

                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleLoginChange}
                  value={loginData.email}
                  mt={5}
                />

                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleLoginChange}
                  value={loginData.password}
                  mt={5}
                />

                <Button colorScheme="blue" mt={5} w="100%" type="submit">
                  Sign In
                </Button>
            
              </FormControl>
            </form>
            <Box className="newUserBox">
                  <Text fontSize="md" mt={2}>
                    New User ?
                  </Text>
                  <div className="signupDiv">
                    <SignUp />
                  </div>
                </Box>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src={loginBannerImage} alt="Login banner" />
      </div>
    </div>
  );
};

export default Login;
