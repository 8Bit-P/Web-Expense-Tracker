import {
  VStack,
  Text,
  Box,
  Spinner,
  Progress,
  Button,
  useDisclosure
} from "@chakra-ui/react";

import { motion } from "framer-motion";

import Pagination from "./Pagination";
import MobileNavbar from "./MobileNavbar";
import GeneralStatisticsGraph from "../graphs/GeneralStatisticsGraph";
import MobileExpenseItem from "../expenses/MobileExpenseItem";
import AddExpenseModal from "../expenses/AddExpenseModal";
import FloatingAddButton from "../others/FloatingAddButton";

const MotionVStack = motion(VStack);

const MobileDashBoard = ({
  username,
  profilePicture,
  expenses,
  fetchExpenses,
  isExpensesLoading,
  currentExpenses,
  totalPages,
  currentPage,
  setCurrentPage,
}) => {

  /* INFO: NEW EXPENSE MODAL HOOK */
  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <>
      <AddExpenseModal isOpen={isOpen} onClose={onClose} fetchExpenses={fetchExpenses}/>
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
        <Text fontWeight={"400"}>Septiembre</Text>
        <Text fontSize={"2xl"} fontWeight="600">
          67.3 €
        </Text>
        <Progress
          size="xs"
          colorScheme={"purple"}
          value={80}
          borderRadius="30px"
        />
        <Text>More text here I guess</Text>
      </VStack>

      <GeneralStatisticsGraph isMobile={true} expenses={expenses} />

      <Box w="90%">
        <Text color="whiteAlpha.700" fontWeight={"600"} pt="10" align="left">
          Daily Spends
        </Text>
      </Box>
      {/* INFO: expenses */}

      <MotionVStack
        maxW={"500px"}
        w="90%"
        bgColor={"boxBackground"}
        boxShadow="rgba(51, 62, 92, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;"
        borderRadius="30px"
        spacing="0"
        pt="20px"
        pb="20px"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {isExpensesLoading ? (
          <Spinner size="lg" />
        ) : currentExpenses.length === 0 ? (
          <VStack>
            <Text fontWeight="600">No expenses found, try creating one!</Text>{" "}
            <Button onClick={onOpen} colorScheme="purple">New Expense</Button>
          </VStack>
        ) : (
          currentExpenses.map((expense) => {
            return (
              <MobileExpenseItem
                key={expense.id}
                expense={expense}
                fetchExpenses={fetchExpenses}
              />
            );
          })
        )}
      </MotionVStack>

      <Pagination
        total={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isMobile={true}
      />

      <FloatingAddButton/>
    </>
  );
};

export default MobileDashBoard;
