import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Box,
  useDisclosure,
  Text,
  Button,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBurger,
  faMoneyBillTransfer,
  faReceipt,
  faMobileScreen,
  faBeer,
  faShoppingCart,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import RemoveExpenseModal from "./RemoveExpenseModal";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

/* TYPE TO ICON TRANSLATION */
const ICONS = {
  FOOD: faBurger,
  DRINKS: faBeer,
  CASUAL_SHOPPING: faShoppingCart,
  ONLINE_SHOPPING: faMobileScreen,
  FRIEND_TRANSFER: faMoneyBillTransfer,
  BILL: faReceipt,
};

const ExpensesList = ({ currentExpenses, fetchExpenses, onOpen: openNewExpenseModal }) => {
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
                  <Tr bgColor={"boxBackground"} key={expense.id}>
                    <Td>
                      <FontAwesomeIcon
                        style={{
                          width: "20px",
                          height: "20px",
                        }}
                        icon={ICONS[expense.type]}
                      />
                    </Td>
                    <Td>{expense.concept}</Td>
                    <Td>
                      {new Date(expense.date).toLocaleDateString("es-ES")}
                    </Td>
                    <Td isNumeric>{expense.amount + "€"}</Td>
                    <Td>
                      <IconButton
                        w="20px"
                        h="20px"
                        bgColor={"transparent"}
                        _hover={{
                          backgroundColor: "transparent",
                          color: "#cf3862",
                        }}
                        _active={{ background: "transparent" }}
                        color="#CC5476"
                      >
                        <FontAwesomeIcon
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                          icon={faPenToSquare}
                        />
                      </IconButton>

                      <IconButton
                        w="25px"
                        h="25px"
                        bgColor={"transparent"}
                        _hover={{
                          backgroundColor: "transparent",
                          color: "#cf3862",
                        }}
                        _active={{ background: "transparent" }}
                        color="#CC5476"
                        onClick={() => deleteExpense(expense.id)}
                      >
                        <FontAwesomeIcon
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                          icon={faTrash}
                        />
                      </IconButton>
                    </Td>
                  </Tr>
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
                    <Button colorScheme={"purple"} ml="5"  boxShadow="rgba(121, 108, 186, 0.35) 0px 5px 15px;" onClick={openNewExpenseModal}>New</Button>
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
