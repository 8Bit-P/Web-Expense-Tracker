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
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const ExpensesList = () => {
  return (
    <TableContainer w="80%" maxW="1250px" pl="120px" pt="25px">
      <Table variant="unstyled" style={{borderCollapse:"separate", borderSpacing:"0 1em"}}>
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
          <Tr bgColor={"boxBackground"}>
            <Td>
              <FontAwesomeIcon
                style={{
                  width: "20px",
                  height: "20px",
                }}
                icon={faBasketShopping}
              />
            </Td>
            <Td>Compra en mercadona de la semana</Td>
            <Td>12/5/22</Td>
            <Td isNumeric>25.4€</Td>
            <Td>
              <IconButton
                w="20px"
                h="20px"
                bgColor={"transparent"}
                _hover={{ backgroundColor: "transparent",color:"#cf3862" }}
                _active={{background:"transparent"}}
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
                _hover={{ backgroundColor: "transparent",color:"#cf3862" }}
                _active={{background:"transparent"}}
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

        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ExpensesList;
