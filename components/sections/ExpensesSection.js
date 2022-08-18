import React from "react";
import {
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faBurger,
  faMartiniGlass,
  faMoneyBillTransfer,
  faReceipt,
  faBasketShopping,
  faMobileScreen,
} from "@fortawesome/free-solid-svg-icons";

const ExpensesSection = () => {
  return (
    <Box
      bgColor={"boxBackground"}
      p="5"
      w="100%"
      h="100%"
      borderRadius={"lg"}
      borderWidth="2px"
      borderColor={"#20254B"}
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
    >
      <TableContainer>
        <Table colorScheme={"whiteAlpha"}>
          <Thead>
            <Tr>
              <Th>Expense Type</Th>
              <Th>Concept</Th>
              <Th isNumeric>Amount</Th>
            </Tr>
          </Thead>

          <Tbody>
            <Tr>
              <Td>
                <FontAwesomeIcon
                  style={{
                    width: "25px",
                    height: "25px",
                  }}
                  icon={faMobileScreen}
                />
              </Td>
              <Td>Compra en mercadona</Td>
              <Td isNumeric>25.4€</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ExpensesSection;
