import React from "react";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";
import { getMaxAmount,getYearlySpent,getMonthlySpent } from "../../utils/commonFunctions";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionText = motion(Text);

const GeneralStatisticsGraph = ({ expenses, isMobile = false }) => {
  

  

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
            fontSize={"xl"}
            fontWeight="700"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1],
              scale: [1.1, 0.8, 1],
            }}
            transition={{ duration: 0.8, delay: 4 }}
          >
            <Text userSelect={"none"} mt="2.5">
              31
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
            <i style={{ color: "#6A59A2" }}>{getMonthlySpent(expenses)} €</i>
          </MotionText>
        </HStack>

        <HStack spacing="5">
          <MotionVStack
            w="50px"
            h="50px"
            bgColor={"customCyan"}
            boxShadow="rgba(57, 175, 226, 0.35) 0px 3px 5px;"
            borderRadius="lg"
            fontSize={"xl"}
            fontWeight="700"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1],
              scale: [1.1, 0.8, 1],
            }}
            transition={{ duration: 0.8, delay: 4.2 }}
          >
            <Text userSelect={"none"} mt="2.5">
              365
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
            <i style={{ color: "#39AFE2" }}>{getYearlySpent(expenses)} €</i>
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
            <i style={{ color: "#3FC4B7" }}>{getMaxAmount(expenses)} €</i>
          </MotionText>
        </HStack>
      </VStack>
    </MotionBox>
  );
};

export default GeneralStatisticsGraph;
