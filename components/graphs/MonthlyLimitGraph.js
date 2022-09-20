import {
  VStack,
  Text,
  Progress,
  Skeleton,
  HStack,
  Spacer,
  IconButton,
  useDisclosure
} from "@chakra-ui/react";
import { getLongMonth, getMonthlySpent } from "../../utils/commonFunctions.js";
import useMonthlyLimit from "../../hooks/useMonthlyLimit.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import MonthlyLimitModal from "../others/MonthlyLimitModal.js";

const MonthlyLimitGraph = ({ expenses }) => {
  const { isLimitLoading, monthlyLimit, error,fetchMonthlyLimit } = useMonthlyLimit();

  function calculateProgressValue() {
    let value = 0;

    if (monthlyLimit) {
      value = (getMonthlySpent(expenses) / monthlyLimit) * 100;
    }

    return Math.min(value, 100);
  }

  const {onOpen,isOpen,onClose} = useDisclosure();

  return (
    <>
    <MonthlyLimitModal isOpen={isOpen} onClose={onClose} fetchMonthlyLimit={fetchMonthlyLimit}/>

    <VStack
      w="90%"
      maxW="500px"
      h="200px"
      bgColor={"blackAlpha.500"}
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
      borderRadius="30px"
      p="5"
      align="left"
      spacing="5"
    >
      <HStack>
        <Text fontWeight={"400"}>{getLongMonth()}</Text>
        <Spacer />

        <IconButton colorScheme={"purple"} size="sm" onClick={onOpen}>
          <FontAwesomeIcon
            style={{ width: "20px", height: "20px" }}
            icon={faChartSimple}
          />
        </IconButton>
      </HStack>
      {isLimitLoading ? (
        <Skeleton h="30px" w="80px">
          100/100
        </Skeleton>
      ) : (
        <Text fontSize={"2xl"} fontWeight="600">
          {getMonthlySpent(expenses) + " / " + monthlyLimit + " €"}
        </Text>
      )}

      {isLimitLoading ? (
        <Skeleton h="5px">Nice progress</Skeleton>
      ) : (
        <Progress
          size="xs"
          colorScheme={calculateProgressValue() === 100 ? "red" : "purple"}
          value={calculateProgressValue()}
          borderRadius="30px"
        />
      )}

      <VStack h="20px" align="left" spacing="0">
        <Text>
          {calculateProgressValue() === 100 ? (
            <span style={{ color: "#e03436" }}>
              {"Money doesn't grow on trees!"}
            </span>
          ) : (
            <span>Nothing to worry about</span>
          )}
        </Text>
        {error && (
          <Text fontWeight="300" color="red.600">
            There was an error loading your data
          </Text>
        )}
      </VStack>
    </VStack>
    </>
  );
};

export default MonthlyLimitGraph;
