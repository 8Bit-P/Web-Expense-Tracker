import {
  Heading,
  HStack,
  VStack,
  Text,
  Button,
  Box,
  Skeleton,
} from "@chakra-ui/react";

import ExpensesList from "../expenses/ExpensesList";
import Navbar from "./Navbar";
import Pagination from "./Pagination";
import Sidebar from "./Sidebar";
import GeneralStatisticsGraph from "../graphs/GeneralStatisticsGraph";
import MonthlyExpenseGraph from "../graphs/MonthlyExpenseGraph";

const DesktopDashboard = ({
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
  /* INFO: get full name Date */
  function getFullNameDate() {
    let date = new Date().toLocaleString("default", { month: "long" });
    let first = date.charAt(0).toUpperCase();
    let rest = date.slice(1, date.length);

    return first + rest + "-" + new Date().getFullYear();
  }

  return (
    <>
      <Navbar name={username} avatar={profilePicture} expenses={expenses} />
      <Sidebar
        fetchExpenses={fetchExpenses}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />

      <HStack w="100%" pt="100px" spacing="20" align={"top"}>
        <VStack align="left" spacing="5" maxW={"400px"} ml="120px" mt="10">
          <VStack align={"left"} spacing="0">
            <Heading>Welcome to your</Heading>{" "}
            <Heading
              background={"-webkit-linear-gradient(45deg,#CC5476, #989BCD)"}
              backgroundClip="text"
            >
              Dashboard!
            </Heading>
          </VStack>
          <Text>
            Take a general view of your expenses and manage some of your data
            through this window
          </Text>
          <HStack>
            <Button
              w="45px"
              h="45px"
              bgColor={"primary"}
              borderWidth="3px"
              borderColor={"primary"}
              _hover={{ backgroundColor: "transparent" }}
              _active={{ backgroundColor: "transparent" }}
              fontWeight="600"
            >
              <Heading mb="2">+</Heading>
            </Button>
            <Text color="primary" fontWeight={"400"}>
              Track and add expense goals for the month!
            </Text>
          </HStack>
        </VStack>

        <GeneralStatisticsGraph expenses={expenses}/>
      </HStack>

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
          <ExpensesList
            currentExpenses={currentExpenses}
            fetchExpenses={fetchExpenses}
            onOpen={onOpen}
          />
        )}

        <Pagination
          total={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </VStack>

      <VStack align="left" spacing="10">
        <Text ml="120px" fontWeight={"600"}>
          ADDITIONAL INFORMATION
        </Text>

        <HStack align="left" pl="120px">
          <Box
            w="200px"
            bgColor={"primary"}
            borderRadius="md"
            h="40px"
            textAlign={"center"}
            pt="2"
            fontWeight={"600"}
          >
            Expenses this month
          </Box>
          <Box
            w="200px"
            bgColor={"primary"}
            borderRadius="md"
            h="40px"
            textAlign={"center"}
            pt="2"
            fontWeight={"600"}
          >
            {getFullNameDate()}
          </Box>
        </HStack>
        <VStack align="left" spacing="6" pl="120px">
          <MonthlyExpenseGraph expenses={expenses} />
        </VStack>
      </VStack>
    </>
  );
};

export default DesktopDashboard;
