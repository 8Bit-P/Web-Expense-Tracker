import React from "react";
import { VStack, Text, Progress } from "@chakra-ui/react";
import {getLongMonth,getMonthlySpent} from '../../utils/commonFunctions.js'

const MonthlyLimitGraph = ({expenses}) => {

  return (
    <VStack
      w="90%"
      maxW="500px"
      h="200px"
      bgColor={"blackAlpha.500"}
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
      borderRadius="30px"
      p="5"
      align="left"
      spacing="5"
    >
      <Text fontWeight={"400"}>{getLongMonth()}</Text>
      <Text fontSize={"2xl"} fontWeight="600">
        {getMonthlySpent(expenses) + " €"}
      </Text>
      <Progress
        size="xs"
        colorScheme={"purple"}
        value={80}
        borderRadius="30px"
      />
      <Text>More text here I guess</Text>
    </VStack>
  );
};

export default MonthlyLimitGraph;
