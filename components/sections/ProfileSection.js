import React from "react";
import { Box, Flex, Avatar, Text, Badge } from "@chakra-ui/react";

const ProfileSection = ({ name, balance }) => {
  return (
    <Box
      bgColor={"boxBackground"}
      p="5"
      w="100%"
      h="100%"
      borderRadius={"lg"}
      borderWidth="2px"
      borderColor={"#20254B"}
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
    >
      <Flex>
        <Avatar src="https://cdn.elnacional.com/wp-content/uploads/2021/05/walter-white.jpg" />
        <Box ml="3" mt="1">
          <Text fontWeight="bold" textOverflow={"ellipsis"} overflow="hidden">
            {name && name.length > 15 ? name.substring(0, 15) + ".." : name}
            
          </Text>
          <Text fontStyle={"italic"} fontSize="sm">
            Balance: {balance + "€"}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProfileSection;
