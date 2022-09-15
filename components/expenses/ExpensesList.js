import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  useDisclosure,
  Text,
  Button,
} from "@chakra-ui/react";

import { useState } from "react";
import RemoveExpenseModal from "./RemoveExpenseModal";
import { motion } from "framer-motion";
import ExpenseItem from "./ExpenseItem";

const MotionBox = motion(Box);

const ExpensesList = ({
  currentExpenses,
  fetchExpenses,
  onOpen: openNewExpenseModal
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  const deleteExpense = (expenseId) => {
    //set state to then pass it to the modal
    setSelectedExpenseId(expenseId);
    onOpen();
  };

  /* ADD: Filter by amount,date,type */
  return (
    <>
      <RemoveExpenseModal
        isOpen={isOpen}
        onClose={onClose}
        fetchExpenses={fetchExpenses}
        expenseId={selectedExpenseId}
      />
      <MotionBox
        w="80%"
        maxW="1250px"
        minW="900px"
        pl="120px"
        pt="25px"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Table
          variant="unstyled"
          style={{ borderCollapse: "separate", borderSpacing: "0 1em" }}
        >
          <Thead>
            <Tr>
              <Th>Type</Th>
              <Th>Concept</Th>
              <Th>Date</Th>
              <Th isNumeric>Amount</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentExpenses.length !== 0 ? (
              currentExpenses.map((expense) => {
                return (
                  <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    deleteExpense={deleteExpense}
                    fetchExpenses={fetchExpenses}
                  />
                );
              })
            ) : (
              <Tr>
                <Td bgColor={"boxBackground"}>
                  <Text
                    background={
                      "-webkit-linear-gradient(45deg,#C4DFC2, #8CBEDF)"
                    }
                    backgroundClip="text"
                    fontSize={"lg"}
                    fontWeight="700"
                  >
                    No expenses found, start by creating some!
                    <Button
                      colorScheme={"purple"}
                      ml="5"
                      boxShadow="rgba(121, 108, 186, 0.35) 0px 5px 15px;"
                      onClick={openNewExpenseModal}
                    >
                      New
                    </Button>
                  </Text>
                </Td>
                <Td bgColor={"boxBackground"}></Td>
                <Td bgColor={"boxBackground"}></Td>
                <Td bgColor={"boxBackground"}></Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </MotionBox>
    </>
  );
};

export default ExpensesList;
