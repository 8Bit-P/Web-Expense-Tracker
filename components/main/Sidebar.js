import { VStack, IconButton, useDisclosure } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faPlusCircle,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { motion } from "framer-motion";
import { signOut } from "next-auth/react";

import AddExpenseModal from "../expenses/AddExpenseModal";

const MotionIconButton = motion(IconButton);

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  


  const goToConfig = () => {
    /* TODO: poner links  */
  };

  return (
    <>
      <AddExpenseModal isOpen={isOpen} onClose={onClose}/>
      <VStack
        h="100%"
        zIndex={0}
        top={0}
        position={"fixed"}
        left="0"
        w="80px"
        bgColor={"boxBackground"}
      >
        {/* ADD NEW EXPENSE */}
        <MotionIconButton
          top="50%"
          color="#CC5476"
          bgColor={"transparent"}
          _hover={{ backgroundColor: "transparent", color: "#cf3862" }}
          _active={{ background: "transparent" }}
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.1 }}
          onClick={onOpen}
        >
          <FontAwesomeIcon
            style={{
              width: "25px",
              height: "25px",
            }}
            icon={faPlusCircle}
          />
        </MotionIconButton>

        {/* CONFIG */}
        <MotionIconButton
          top="50%"
          color="#CC5476"
          bgColor={"transparent"}
          _hover={{ backgroundColor: "transparent", color: "#cf3862" }}
          _active={{ background: "transparent" }}
          whileHover={{ rotate: 30 }}
          transition={{ duration: 0.15 }}
          onClick={() => goToConfig}
        >
          <FontAwesomeIcon
            style={{
              width: "25px",
              height: "25px",
            }}
            icon={faGear}
          />
        </MotionIconButton>
        {/* LOGOUT */}
        <MotionIconButton
          top="50%"
          color="#CC5476"
          bgColor={"transparent"}
          _hover={{ backgroundColor: "transparent", color: "#cf3862" }}
          _active={{ background: "transparent" }}
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.1 }}
          onClick={() => signOut()}
        >
          <FontAwesomeIcon
            style={{
              width: "25px",
              height: "25px",
            }}
            icon={faRightFromBracket}
          />
        </MotionIconButton>
      </VStack>
    </>
  );
};

export default Sidebar;
