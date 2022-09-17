import React from "react";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionText = motion(Text);

const GeneralStatisticsGraph = ({ expenses, isMobile = false }) => {
  function getDayOfYear(date = new Date()) {
    const timestamp1 = Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const timestamp2 = Date.UTC(date.getFullYear(), 0, 0);

    const differenceInMilliseconds = timestamp1 - timestamp2;

    const differenceInDays = differenceInMilliseconds / 1000 / 60 / 60 / 24;

    return differenceInDays;
  }

  function getMonthlySpent() {
    let total = 0;

    if (expenses) {
      expenses.forEach((expense) => {
        let expenseDate = new Date(expense.date);
        if (expenseDate.getMonth() === new Date().getMonth()) {
          total += expense.amount;
        }
      });
    }

    return total;
  }

  function getYearlySpent() {
    let total = 0;

    if (expenses) {
      expenses.forEach((expense) => {
        let expenseDate = new Date(expense.date);
        if (expenseDate.getFullYear() === new Date().getFullYear()) {
          total += expense.amount;
        }
      });
    }

    return total;
  }

  function getMaxAmount() {
    let best = 0;

    if (expenses) {
      expenses.forEach((expense) => {
        let expenseDate = new Date(expense.date);
        if (
          expenseDate.getFullYear() === new Date().getFullYear() &&
          expense.amount > best
        ) {
          best = expense.amount;
        }
      });
    }

    return best;
  }

  return (
    <MotionBox
      h="300px"
      maxW="500px"
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
      bgColor="blackAlpha.500"
      borderRadius="30px"
      transformOrigin={"topLeft"}
      p="5"
      initial={{ y: 30, opacity: 0 }}
      animate={
        !isMobile
          ? {
              opacity: [0, 1, 1],
              height: ["25px", "150px", "300px"],
              width: ["150px", "150px", "500px"],
            }
          : {
              opacity: [0, 1, 1],
              height: ["25px", "150px", "300px"],
              width: ["40%", "40%", "90%"],
            }
      }
      transition={{ duration: 3, delay: 1 }}
    >
      <MotionText
        initial={{ y: 10, x: -5 }}
        animate={
          !isMobile
            ? {
                x: [-5, -5, 300],
                y: [-15, 5, 5],
              }
            : {
                opacity:[0,1],
                marginLeft:"30px"
              }
        }
        transition={{ duration: 3, delay: 1.2 }}
        fontSize={"xl"}
        fontWeight="700"
        w="200px"
      >
        Quick Recap
      </MotionText>
      <VStack align="left" mt="10" spacing="3" pl="5">
        <HStack spacing="5">
          <MotionVStack
            w="50px"
            h="50px"
            bgColor={"#6A59A2"}
            boxShadow="rgba(121, 108, 186, 0.35) 0px 3px 5px;"
            borderRadius="lg"
            fontSize={"lg"}
            fontWeight="700"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1],
              scale: [1.1, 0.8, 1],
            }}
            transition={{ duration: 0.8, delay: 4 }}
          >
            <Text userSelect={"none"} position="absolute" mr="15px" mt="0px">
              {new Date().getDate()}
            </Text>
            <Box pr="28px">
              <Box
                w="30px"
                h="2px"
                position="absolute"
                mt="4"
                transform={"rotate(-25deg)"}
                bgColor={"fontColor"}
                borderRadius="4px"
              />
            </Box>
            <Text userSelect={"none"} position="absolute" pt="15px" pl="15px">
              {new Date(
                new Date().getMonth(),
                new Date().getFullYear(),
                0
              ).getDate()}
            </Text>
          </MotionVStack>
          <MotionText
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            transition={{ duration: 0.5, delay: 5 }}
            fontSize={!isMobile ? "lg" : "15px"}
            fontWeight="600"
          >
            This month Expenses:{" "}
            <i style={{ color: "#6A59A2" }}>{getMonthlySpent()} €</i>
          </MotionText>
        </HStack>

        <HStack spacing="5">
          <MotionVStack
            w="50px"
            h="50px"
            bgColor={"customCyan"}
            boxShadow="rgba(57, 175, 226, 0.35) 0px 3px 5px;"
            borderRadius="lg"
            fontSize={"16px"}
            fontWeight="700"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1],
              scale: [1.1, 0.8, 1],
            }}
            transition={{ duration: 0.8, delay: 4.2 }}
          >
            <Text userSelect={"none"} position="absolute" mr="15px" mt="0px">
              {getDayOfYear()}
            </Text>
            <Box pr="28px">
              <Box
                w="30px"
                h="2px"
                position="absolute"
                mt="4"
                transform={"rotate(-20deg)"}
                bgColor={"fontColor"}
                borderRadius="4px"
              />
            </Box>
            <Text userSelect={"none"} position="absolute" pt="15px" pl="15px">
              365 {/* TODO: should change it for leap years */}
            </Text>
          </MotionVStack>
          <MotionText
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            transition={{ duration: 0.5, delay: 5.2 }}
            fontSize={!isMobile ? "lg" : "15px"}
            fontWeight="600"
          >
            This year Expenses:{" "}
            <i style={{ color: "#39AFE2" }}>{getYearlySpent()} €</i>
          </MotionText>
        </HStack>

        <HStack spacing="5">
          <MotionVStack
            w="50px"
            h="50px"
            bgColor={"customGreen"}
            boxShadow="rgba(64, 196, 183, 0.35) 0px 3px 5px;"
            borderRadius="lg"
            fontSize={"xl"}
            fontWeight="700"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1],
              scale: [1.1, 0.8, 1],
            }}
            transition={{ duration: 0.8, delay: 4.4 }}
          >
            <FontAwesomeIcon
              style={{
                width: "25px",
                height: "25px",
                marginTop: "15px",
              }}
              icon={faMedal}
            />
          </MotionVStack>
          <MotionText
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            transition={{ duration: 0.5, delay: 5.4 }}
            fontSize={!isMobile ? "lg" : "15px"}
            fontWeight="600"
          >
            Top expense this year:{" "}
            <i style={{ color: "#3FC4B7" }}>{getMaxAmount()} €</i>
          </MotionText>
        </HStack>
      </VStack>
    </MotionBox>
  );
};

export default GeneralStatisticsGraph;
