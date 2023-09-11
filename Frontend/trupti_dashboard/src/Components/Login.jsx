import React from "react";
import "../Styles/login.css";
import { loginBannerImage, logo } from "../utils/image";
import { FormControl, Button, Input, Heading, Text,Box } from "@chakra-ui/react";
import SignUp from "./SignUp";
const Login = () => {
  return (
    <div className="container">
      <div className="loginContainer">
        <div>
          <div>
            <img src={logo} alt="logo" />
          </div>
          <div>
            <FormControl>
              <Heading as="h4" size="md" mt={5}>
                Sign In
              </Heading>

              <Input type="email" placeholder="Email" mt={5} />

              <Input type="password" placeholder="password" mt={5} />

              <Button colorScheme="blue" mt={5} w="100%">
                Sign In
              </Button>
              <Box className="newUserBox">
              <Text fontSize="md" mt={2}>
                New User ?
              </Text>
              <div className="signupDiv"><SignUp /></div>
              
              </Box>
             
            </FormControl>
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
