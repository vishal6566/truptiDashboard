import React from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react"; // Import Chakra UI components
import { AddIcon } from "@chakra-ui/icons"; // Import Chakra UI icons
import { useDisclosure } from "@chakra-ui/hooks";
const SignUp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  return (
    <>
      <Text mt={2} leftIcon={<AddIcon />} color="teal" onClick={onOpen}>
        SignUp
      </Text>
      <Drawer
        isOpen={isOpen}
        placement="left"
        initialFocusRef={firstField}
        onClose={onClose}
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Create a new account
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input ref={firstField} placeholder="Please enter user name" />
              </Box>

              <Box>
                <FormLabel htmlFor="name">Email</FormLabel>
                <Input placeholder="Please enter user email" />
              </Box>

              <Box>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input placeholder="Please enter user Password" />
              </Box>

             
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">SignUp</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SignUp;
