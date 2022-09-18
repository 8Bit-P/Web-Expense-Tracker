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
  Input,
  Box,
} from "@chakra-ui/react";

import axios from "axios";
import { UtilsContext } from "../../context/UtilsContext";

const MonthlyLimitModal = ({ isOpen, onClose,fetchMonthlyLimit }) => {
  const utils = useContext(UtilsContext);

  const [limit, setLimit] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

    const handleLimitUpdate = (e) => {
        setLimit(e.target.value)
    }

  const updateLimit = () => {
    setIsLoading(true);
    axios
      .post("http://localhost:3000/api/updateMonthlyLimit", {
        email: utils.email,
        limit
      })
      .then((res) => {
        console.log(res.data);
        onClose();
        setError(null);
        fetchMonthlyLimit();
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
        setLimit(0);
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
        <ModalHeader mt="5">Add your monthly estimate</ModalHeader>
        <ModalCloseButton />
        <ModalBody bgColor={"modal"}>
          <VStack spacing="5">
            <Text mb={5} w="250px" fontSize="md" fontWeight="400">
              Use this to track how good you are doing in your monthly expenses
            </Text>

            <Input value={limit} textAlign={"center"} variant={"flushed"} w="150px" type="number" onChange={(e) => handleLimitUpdate(e)}/>

            <Button colorScheme={"purple"} isLoading={isLoading} onClick={updateLimit}>Submit</Button>

            {error && (
              <Text w="250px" m="0 auto" mt="5" pb="5" color="red.400">
                There was a problem with your data, please check again
              </Text>
            )}

            <Box h="20px"/>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MonthlyLimitModal;
