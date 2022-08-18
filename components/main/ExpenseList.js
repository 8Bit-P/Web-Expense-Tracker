import { Box, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import Expense from "./Expense";

const ExpenseList = () => {
  return (
    <>
      <VStack align="left">
        <Expense />
        <Expense />
        <Expense />
        <Expense />
        <Expense />
      </VStack>

      <HStack mt="5">
        <Box w="50px" h="50px" bgColor={"secondary"}/>
      </HStack>
    </>
  );
};

export default ExpenseList;
