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

import ExpensesList from "../expenses/ExpensesList";
import Navbar from "./Navbar";
import Pagination from "./Pagination";
import Sidebar from "./Sidebar";
import GeneralStatisticsGraph from "../graphs/GeneralStatisticsGraph";
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
        w="80%"
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
    </>
  );
};

export default MobileDashBoard;
