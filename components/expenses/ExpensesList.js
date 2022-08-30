import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Box,
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

const ICONS = {
  FOOD: faBurger,
  DRINKS: faBeer,
  CASUAL_SHOPPING: faShoppingCart,
  ONLINE_SHOPPING: faMobileScreen,
  FRIEND_TRANSFER: faMoneyBillTransfer,
  BILL: faReceipt,
};

const ExpensesList = ({ expenses }) => {
  
  const [expenseList, setExpenseList] = useState(expenses)

  /* TODO: update list when new expense is added */
  /* (compare newly fetched expenses with getserversideprops expenses to see if they have changed) */

  return (
    <Box w="80%" maxW="1250px" pl="120px" pt="25px">
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
          {expenses.length !== 0 ? (
            expenses.map((expense) => {
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
                  <Td>{new Date(expense.date).toLocaleDateString("es-ES")}</Td>
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
              <Td>No expenses found, start by creating some!</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ExpensesList;
