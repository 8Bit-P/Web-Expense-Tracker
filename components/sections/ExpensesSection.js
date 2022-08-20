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
import axios from "axios";
import { useEffect } from "react";

export default function ExpensesSection ({expenses}) {

  useEffect(() => {
    console.log(expenses)
  }, [expenses])
  

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
              <Th>Date</Th>
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
};




export const getServerSideProps = async () => {
  const expenses = await axios.get("http://localhost:3000/api/expenses").json()

  return{
    props:expenses
  }
}