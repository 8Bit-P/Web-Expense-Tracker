import { Avatar, HStack, Spacer, Text, VStack,Box } from "@chakra-ui/react";
import React,{useState} from "react";


const Navbar = ({
  name = "Walter White",
  balance = 0,
  avatar = "https://cdn.elnacional.com/wp-content/uploads/2021/05/walter-white.jpg",
}) => {

  const [page, setPage] = useState(0)

  return (
    <HStack
      h="80px"
      w="100%"
      p="5"
      spacing={10}
      color="fontColor"
      bgColor="boxBackground"
      zIndex={1}
      position="fixed"
    >
      <Box w="40px" h="40px" bgColor={"primary"} borderRadius="lg"/>

      <Box  cursor={"pointer"} h="80px" w="auto" borderBottomWidth={ page == 0 && "2px"} borderBottomColor="primary">
        <Text mt="7" color={page == 0 && "primary"}>Dashboard</Text>
      </Box>

      {/* <Box  cursor={"pointer"} h="80px" w="auto" borderBottomWidth={ page == 1 && "2px"} borderBottomColor="primary">
        <Text mt="7" color={ page == 1 && "primary"}>Graphics</Text>
      </Box>

      <Box  cursor={"pointer"} h="80px" w="auto" borderBottomWidth={page == 2 && "2px"} borderBottomColor="primary">
        <Text mt="7" color={page == 2 && "primary"}>Savings</Text>
      </Box>

      <Box  cursor={"pointer"} h="80px" w="auto" borderBottomWidth={page == 3 && "2px"} borderBottomColor="primary">
        <Text mt="7" color={page == 3 &&  "primary"}>I guess</Text>
      </Box> */}

      <Spacer />

      <HStack spacing="5">
        <VStack spacing="0" align={"right"}>
          <Text fontWeight="bold" textOverflow={"ellipsis"} overflow="hidden">
            {name}
          </Text>
          <Text fontStyle={"italic"} fontSize="sm">
            Balance: {balance + "€"} {/* TODO: */}
          </Text>
        </VStack>
        <Avatar src={avatar} referrerPolicy="no-referrer"/>
        <Box h="10px" w="10px" transform={"rotate(45deg)"} bgColor="customPurple" cursor={"pointer"}>
          <Box h="6px" w="6px" margin={"0 auto"} top="50%" left="50%" position={"absolute"} transform={"translate(-50%, -50%)"} bgColor="primary"/>
        </Box>
      </HStack>
    </HStack>
  );
};

export default Navbar;
