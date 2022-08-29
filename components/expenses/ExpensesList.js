import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
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
  faNoteSticky,
  faCalendarAlt,
  faMoneyBill,
  faBasketShopping,
  faShoppingCart,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const ExpensesList = ({ expenses }) => {

  const ICONS ={
    "FOOD":faBurger,
    "DRINKS":faBeer,
    "CASUAL_SHOPPING":faShoppingCart,
    "ONLINE_SHOPPING":faMobileScreen,
    "FRIEND_TRANSFER":faMoneyBillTransfer,
    "BILL":faReceipt
  }

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
          {expenses.map((expense) => {
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
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ExpensesList;
