import { Box, HStack, VStack, Text, Spacer } from "@chakra-ui/react";
import { ChevronDownIcon,ChevronUpIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBurger,
  faMoneyBillTransfer,
  faReceipt,
  faMobileScreen,
  faBeer,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { motion, useAnimationControls } from "framer-motion";

const MotionBox = motion(Box);

const ICONS = {
  FOOD: faBurger,
  DRINKS: faBeer,
  CASUAL_SHOPPING: faShoppingCart,
  ONLINE_SHOPPING: faMobileScreen,
  FRIEND_TRANSFER: faMoneyBillTransfer,
  BILL: faReceipt,
};

/* TODO: MAKE BIG FILE WITH STYLES AND FUNCTIONS (UTILS) */
const COLORS = {
  FOOD: "primary",
  DRINKS: "customGreen",
  CASUAL_SHOPPING: "customPurple",
  ONLINE_SHOPPING: "customCyan",
  FRIEND_TRANSFER: "customBlue",
  BILL: "customPink",
};

const BOX_SHADOWS = {
  FOOD: "204, 84, 118",
  DRINKS: "63, 196, 183",
  CASUAL_SHOPPING: "106, 89, 162",
  ONLINE_SHOPPING: "57, 175, 226",
  FRIEND_TRANSFER: "47, 82, 209",
  BILL: "193, 45, 144",
};

const MONTHS = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sept",
  "Oct",
  "Nov",
  "Dic",
];

const MobileExpenseItem = ({ expense, deleteExpense, fetchExpenses }) => {
  function formatDate(date) {
    let formatedDate = "";
    let convertedDate = new Date(date);

    formatedDate =
      convertedDate.getDate() +
      ", " +
      MONTHS[convertedDate.getMonth()] +
      " " +
      convertedDate.getFullYear();

    return formatedDate;
  }

  function sliceConcept(concept){
    let words = concept.split(" ");
    if(words[0].length < 12){
        return words[0]
    }else{
        return concept.slice(0,7) + "...";
    }
  }

  /* INFO: animation controls for accordion */

  const controls = useAnimationControls();
  const [isExtended, setIsExtended] = useState(false);

  const toggleAnimation = () => {
    if (isExtended) {
      controls.start({ height: "60px" });
    } else {
      controls.start({ height: "90px" });
    }

    setIsExtended(!isExtended);
  };

  return (
    <MotionBox
      h="60px"
      w="100%"
      backgroundColor={"boxBackground"}
      borderRadius="30px"
      pl="5"
      pr="5"
      onClick={toggleAnimation}
      animate={controls}
    >
      <HStack spacing="5" mt="8px">
        <Box
          bgColor={COLORS[expense.type]}
          boxShadow={`rgba(${BOX_SHADOWS[expense.type]}, 0.35) 0px 3px 5px;`}
          w="40px"
          h="40px"
          borderRadius={"md"}
          pt="2"
        >
          <FontAwesomeIcon
            style={{
              width: "25px",
              height: "25px",
              margin: "0 auto",
            }}
            icon={ICONS[expense.type]}
          />
        </Box>

        <VStack spacing="0" align={"left"}>
          <Text fontWeight="600">{sliceConcept(expense.concept)}</Text>
          <Text fontWeight="700" fontSize="13px">
            {`${expense.amount} €`}
          </Text>
        </VStack>
        <Spacer />
        <Text fontSize={"15px"} fontWeight="400">
          {formatDate(expense.date)}
        </Text>
        {isExtended ? <ChevronUpIcon fontSize="xl"/> : <ChevronDownIcon fontSize="xl"/>}
        
      </HStack>

      {isExtended && <Text ml="2" mt="2" fontWeight={"300"} color="whiteAlpha.800">{expense.concept}</Text>}
    </MotionBox>
  );
};

export default MobileExpenseItem;
