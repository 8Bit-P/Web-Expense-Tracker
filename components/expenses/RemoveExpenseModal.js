import React, { useState, useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";

import axios from "axios";
import { UtilsContext } from "../../context/UtilsContext";

const RemoveExpenseModal = ({ isOpen, onClose, fetchExpenses, expenseId }) => {
  const utils = useContext(UtilsContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const deleteExpense = () => {
    setIsLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}removeExpense`, { id: expenseId })
      .then(() => {
        fetchExpenses();
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setIsLoading(false);
      })
      .then(() => {
        onClose();
        setError(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal
      size="sm"
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="scale"
    >
      <ModalOverlay />
      <ModalContent textAlign={"center"} bgColor={"modal"} color="fontColor">
        <ModalHeader mt="5">Delete Expense</ModalHeader>
        <ModalCloseButton />
        <ModalBody bgColor={"modal"}>
          <VStack>
            <Text mb={5} w="200px" fontWeight="600">
              Are you sure you want to delete this expense?
            </Text>
            <HStack pb="5">
              <Button
                bgColor={"#2C0C16"}
                _hover={{ bgColor: "#441425" }}
                _active={{ bgColor: "#441425" }}
                fontWeight="400"
                color="#E52265"
                mr={2}
                onClick={deleteExpense}
                isLoading={isLoading}
              >
                Delete
              </Button>
              <Button colorScheme={"messenger"} onClick={onClose} ml={2}>
                Cancel
              </Button>
            </HStack>

            {error && (
              <Text w="250px" m="0 auto" mt="5" pb="5" color="red.400">
                There was a problem with your data, please check again
              </Text>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RemoveExpenseModal;
