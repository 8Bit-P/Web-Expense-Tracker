import {
  Heading,
  HStack,
  VStack,
  Text,
  Button,
  Box,
  Skeleton,
  Progress,
} from "@chakra-ui/react";

import Pagination from "./Pagination";
import MonthlyExpenseGraph from "../graphs/MonthlyExpenseGraph";
import MobileNavbar from "./MobileNavbar";

const MobileDashBoard = ({
  username,
  profilePicture,
  expenses,
  fetchExpenses,
  isOpen,
  onOpen,
  onClose,
  isExpensesLoading,
  currentExpenses,
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <>
      <MobileNavbar
        name={username}
        avatar={profilePicture}
        expenses={expenses}
      />

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
        <Text fontWeight={"400"}>Month</Text>
        <Text fontSize={"2xl"} fontWeight="600">500 €</Text>
        <Progress size="xs" colorScheme={"purple"} value={10} borderRadius="30px"/>
        <Text>More text here I guess</Text>
      </VStack>

      {/* INFO: expenses */}
      <VStack align="left" pb="10">
        {isExpensesLoading ? (
          <VStack
            pt="50px"
            pb="25px"
            w="80%"
            maxW="1250px"
            pl="120px"
            spacing="5"
          >
            <Skeleton w="100%" h="20px" />
            <Skeleton w="100%" h="50px" />
            <Skeleton w="100%" h="50px" />
            <Skeleton w="100%" h="50px" />
            <Skeleton w="100%" h="50px" />
            <Skeleton w="100%" h="50px" />
          </VStack>
        ) : (
          <Text>new system needed</Text>
        )}

        <Pagination
          total={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </VStack>

    </>
  );
};

export default MobileDashBoard;
