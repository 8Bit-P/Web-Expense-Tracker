import {
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  Button,
  MenuDivider,
  IconButton,
  MenuItem,
  Wrap,
  Box,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBurger,
  faMoneyBillTransfer,
  faReceipt,
  faMobileScreen,
  faBeer,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { BOX_SHADOWS, COLORS } from "../../utils/constants";

const ICONS = {
  FOOD: faBurger,
  DRINKS: faBeer,
  CASUAL_SHOPPING: faShoppingCart,
  ONLINE_SHOPPING: faMobileScreen,
  FRIEND_TRANSFER: faMoneyBillTransfer,
  BILL: faReceipt,
};

const expenseTypes = [
  "FOOD",
  "DRINKS",
  "CASUAL_SHOPPING",
  "ONLINE_SHOPPING",
  "FRIEND_TRANSFER",
  "BILL",
];

const ExpenseSorting = ({ updateSortingMethod }) => {
  return (
    <Menu  isLazy placement="bottom-start" gutter="10">
      <MenuButton
        color="whiteAlpha.700"
        fontWeight={"400"}
        variant="transparent"
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        Sort By
      </MenuButton>
      <MenuList zIndex="10" bgColor="modal" borderColor={"transparent"}>
        <MenuOptionGroup
          title="Order by"
          type="radio"
          onChange={(value) => updateSortingMethod(value)}
        >
          <MenuItemOption
            _focus={{ backgroundColor: "transparent" }}
            _active={{ backgroundColor: "transparent" }}
            value="recent"
          >
            Recent
          </MenuItemOption>
          <MenuItemOption
            _focus={{ backgroundColor: "transparent" }}
            _active={{ backgroundColor: "transparent" }}
            value="most"
          >
            Most expended
          </MenuItemOption>
          <MenuItemOption
            _focus={{ backgroundColor: "transparent" }}
            _active={{ backgroundColor: "transparent" }}
            value="least"
          >
            Least expended
          </MenuItemOption>
        </MenuOptionGroup>
        <MenuDivider  bgColor={"fontColor"} w="60%" mb="5" ml="10"/>

        <Wrap ml="10" pb="5" w="150px" align="center">
          {expenseTypes.map((expense) => {
            return (
              <MenuItem
                _active={{backgroundColor:"transparent"}}
                _focus={{backgroundColor:"transparent"}}
                bgColor={COLORS[expense]}
                boxShadow={`rgba(${BOX_SHADOWS[expense]}, 0.35) 0px 3px 5px;`}
                w="40px"
                h="40px"
                borderRadius={"md"}
                pt="2"
                onClick={() => updateSortingMethod("TYPE-" + expense)}
                p="0"
              >
                <FontAwesomeIcon
                  style={{
                    width: "25px",
                    height: "25px",
                    margin: "0 auto",
            
                  }}
                  icon={ICONS[expense]}
                />
              </MenuItem>
            );
          })}
        </Wrap>
      </MenuList>
    </Menu>
  );
};

export default ExpenseSorting;
