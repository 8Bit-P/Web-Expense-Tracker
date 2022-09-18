import {
  Box,
  HStack,
  VStack,
  Text,
  Spacer,
  useMediaQuery,
  IconButton,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBurger,
  faMoneyBillTransfer,
  faReceipt,
  faMobileScreen,
  faBeer,
  faShoppingCart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { motion, useAnimationControls } from "framer-motion";
import { COLORS, BOX_SHADOWS } from "../../utils/constants.js";
import { formatDate, sliceConcept } from "../../utils/commonFunctions.js";

const MotionBox = motion(Box);

const ICONS = {
  FOOD: faBurger,
  DRINKS: faBeer,
  CASUAL_SHOPPING: faShoppingCart,
  ONLINE_SHOPPING: faMobileScreen,
  FRIEND_TRANSFER: faMoneyBillTransfer,
  BILL: faReceipt,
};

const MobileExpenseItem = ({ expense, deleteExpense }) => {
  const [isSmallScreen] = useMediaQuery("(min-width: 370px)");

  /* INFO: animation controls for accordion */

  const controls = useAnimationControls();
  const [isExtended, setIsExtended] = useState(false);

  const toggleAnimation = () => {
    if (isExtended) {
      controls.start({ height: "60px" });
    } else {
      controls.start({ height: "120px" });
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
        <Text fontSize={!isSmallScreen ? "12px" : "15px"} fontWeight="400">
          {formatDate(expense.date)}
        </Text>
        {isExtended ? (
          <ChevronUpIcon fontSize="xl" />
        ) : (
          <ChevronDownIcon fontSize="xl" />
        )}
      </HStack>

      {isExtended && (
        <>
          <Text ml="2" mt="2" fontWeight={"300"} color="whiteAlpha.800">
            {expense.concept}
          </Text>

          <HStack w="100%">
            <Spacer />
            <IconButton zIndex={10} size="sm" colorScheme={"pink"} onClick={() => deleteExpense(expense.id)}>
              <FontAwesomeIcon
                style={{ height: "15px", width: "15px" }}
                icon={faTrash}
              />
            </IconButton>
          </HStack>
        </>
      )}
    </MotionBox>
  );
};

export default MobileExpenseItem;
