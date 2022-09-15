import {
  Avatar,
  HStack,
  Spacer,
  Text,
  VStack,
  Box,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const MobileNavbar = ({
  name = "Walter White",
  expenses = {},
  avatar = "https://cdn.elnacional.com/wp-content/uploads/2021/05/walter-white.jpg",
}) => {
  const [spent, setSpent] = useState(0);

  useEffect(() => {
    let tempExpendedSum = 0;

    expenses.forEach((expense) => {
      tempExpendedSum += expense.amount;
    });

    setSpent(tempExpendedSum.toFixed(2));
  }, [expenses]);
  return (
    <HStack h="80px" w="100%" p="5" color="fontColor" zIndex={1} mt="10">
      <Image src="/MyExpenseLogo.svg" width="40px" height="40px" />

      <Heading color="fontColor">Dashboard</Heading>

      <Spacer />

      <Avatar
        boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
        src={avatar}
        referrerPolicy="no-referrer"
        borderRadius={"md"}
      />
    </HStack>
  );
};

export default MobileNavbar;
