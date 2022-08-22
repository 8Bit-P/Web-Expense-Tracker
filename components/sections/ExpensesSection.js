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
  HStack,
  Text,
  Spacer,
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
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

function ExpensesSection({}) {
  return (
    <Box
      bgColor={"boxBackground"}
      p="5"
      w="100%"
      h="100%"
      borderRadius={"lg"}
      borderWidth="2px"
      borderColor={"#24204b"}
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
    >
      <HStack fontWeight={"600"}>
        <Box
          borderRadius={"100%"}
          bgColor="#1ab1c4"
          p="1.5"
          boxShadow={"rgba(26, 177, 196, 0.24) 0px 3px 8px;"}
        >
          <FontAwesomeIcon
            style={{
              width: "20px",
              height: "20px",
            }}
            icon={faDollarSign}
          />
        </Box>
        <Text>Expense record</Text>

        <Spacer />

        <Text>
          {" "}
          <span style={{ color: "#cf3f1b" }}>234</span> Total Expenses
        </Text>
      </HStack>

      <TableContainer mt="5">
        <Table colorScheme={"whiteAlpha"} size="sm">
          <Thead>
            <Tr>
              <Th>Expense Type</Th>
              <Th>Concept</Th>
              <Th>Date</Th>
              <Th isNumeric>Amount</Th>
            </Tr>
          </Thead>

          <Tbody>
            <Tr>
              <Td>
                <FontAwesomeIcon
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                  icon={faBasketShopping}
                />
              </Td>
              <Td>Compra en mercadona</Td>
              <Td>12/5/22</Td>
              <Td isNumeric>25.4€</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ExpensesSection;
