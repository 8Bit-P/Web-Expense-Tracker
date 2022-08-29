import React, { useState,useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  InputGroup,
  Input,
  InputLeftElement,
  Text,
  IconButton,
  Wrap,
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
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Authcontext } from "../../context/AuthContext";

const AddExpenseModal = ({ isOpen, onClose }) => {
  
  const auth = useContext(Authcontext);
  
  const [expenseType, setExpenseType] = useState();
  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState(0.0);
  const [date, setDate] = useState(new Date());

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const createExpense = () => {
    axios.post("http://localhost:3000/api/expenses",{concept, expenseType, amount, email: auth.email}).then( () => {
      console.log("User created succesfully");
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale">
      <ModalOverlay />
      <ModalContent textAlign={"center"} bgColor={"modal"} color="fontColor">
        <ModalHeader mt="5">New Expense</ModalHeader>
        <ModalCloseButton />
        <ModalBody bgColor={"modal"}>
          <form>
            {/* CONCEPT */}
            <InputGroup w="300px" m="0 auto">
              <InputLeftElement
                pointerEvents="none"
                children={
                  <FontAwesomeIcon
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                    icon={faNoteSticky}
                  />
                }
              />
              <Input
                borderWidth="2px"
                borderColor={"whiteAlpha.600"}
                type="text"
                placeholder="Concept"
                borderRadius={"xl"}
                maxLength={40}
              />
            </InputGroup>

            {/* AMOUNT */}
            <InputGroup w="300px" m="0 auto" mt="5">
              <InputLeftElement
                pointerEvents="none"
                children={
                  <FontAwesomeIcon
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                    icon={faMoneyBill}
                  />
                }
              />
              <Input
                borderWidth="2px"
                borderColor={"whiteAlpha.600"}
                type="number"
                placeholder="Amount"
                borderRadius={"xl"}
              />
            </InputGroup>

            <InputGroup w="300px" m="0 auto" mt="5">
              <InputLeftElement
                pointerEvents="none"
                children={
                  <FontAwesomeIcon
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                    icon={faCalendarAlt}
                  />
                }
              />
              <Input
                className="dateInput"
                borderWidth="2px"
                borderColor={"whiteAlpha.600"}
                type="date"
                placeholder="Date"
                borderRadius={"xl"}
              />
            </InputGroup>

            {/* RADIO FOR TYPES */}
            <Wrap m="0 auto" mt="5" w="200px" justify={"center"} spacing="3">
              <IconButton
                w="50px"
                h="50px"
                variant="outline"
                borderRadius={"xl"}
                borderWidth="2px"
                colorScheme={"whiteAlpha"}
                borderColor={expenseType === "FOOD" && "purple.400"}
                onClick={() => setExpenseType("FOOD")}
              >
                <FontAwesomeIcon
                  style={{
                    width: "25px",
                    height: "25px",
                  }}
                  icon={faBurger}
                />
              </IconButton>
              <IconButton
                w="50px"
                h="50px"
                variant="outline"
                borderRadius={"xl"}
                borderColor={expenseType === "ONLINE_SHOPPING" && "purple.400"}
                borderWidth="2px"
                colorScheme={"whiteAlpha"}
                onClick={() => setExpenseType("ONLINE_SHOPPING")}
              >
                <FontAwesomeIcon
                  style={{
                    width: "25px",
                    height: "25px",
                  }}
                  icon={faMobileScreen}
                />
              </IconButton>

              <IconButton
                w="50px"
                h="50px"
                variant="outline"
                borderRadius={"xl"}
                borderColor={expenseType === "CASUAL_SHOPPING" && "purple.400"}
                borderWidth="2px"
                colorScheme={"whiteAlpha"}
                onClick={() => setExpenseType("CASUAL_SHOPPING")}
              >
                <FontAwesomeIcon
                  style={{
                    width: "25px",
                    height: "25px",
                  }}
                  icon={faShoppingCart}
                />
              </IconButton>
              <IconButton
                w="50px"
                h="50px"
                variant="outline"
                borderRadius={"xl"}
                borderColor={expenseType === "FRIEND_TRANSFER" && "purple.400"}
                borderWidth="2px"
                colorScheme={"whiteAlpha"}
                onClick={() => setExpenseType("FRIEND_TRANSFER")}
              >
                <FontAwesomeIcon
                  style={{
                    width: "25px",
                    height: "25px",
                  }}
                  icon={faMoneyBillTransfer}
                />
              </IconButton>
              <IconButton
                w="50px"
                h="50px"
                variant="outline"
                borderRadius={"xl"}
                borderColor={expenseType === "DRINKS" && "purple.400"}
                borderWidth="2px"
                colorScheme={"whiteAlpha"}
                onClick={() => setExpenseType("DRINKS")}
              >
                <FontAwesomeIcon
                  style={{
                    width: "25px",
                    height: "25px",
                  }}
                  icon={faBeer}
                />
              </IconButton>
              <IconButton
                w="50px"
                h="50px"
                variant="outline"
                borderRadius={"xl"}
                borderColor={expenseType === "BILL" && "purple.400"}
                borderWidth="2px"
                colorScheme={"whiteAlpha"}
                onClick={() => setExpenseType("BILL")}
              >
                <FontAwesomeIcon
                  style={{
                    width: "25px",
                    height: "25px",
                  }}
                  icon={faReceipt}
                />
              </IconButton>
            </Wrap>
            {error && (
              <Text w="300px" m="0 auto" mt="5" color="red.400">
                There was a problem with your data, please check again
              </Text>
            )}
          </form>
        </ModalBody>

        <ModalFooter>
          <Button
            bgColor={"#2C0C16"}
            _hover={{ bgColor: "#441425" }}
            _active={{ bgColor: "#441425" }}
            fontWeight="400"
            color="#E52265"
            mr={3}
            onClick={onClose}
          >
            Close
          </Button>
          <Button fontWeight="400" colorScheme={"messenger"} type="submit" onClick={createExpense}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddExpenseModal;
