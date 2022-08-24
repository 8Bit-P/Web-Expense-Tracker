import { VStack, IconButton } from "@chakra-ui/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear,faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import {motion} from 'framer-motion'

const MotionIconButton = motion(IconButton);


const Sidebar = () => {


    const goToConfig = () => {
      /* TODO: poner links  */
    }

  return (
    <VStack
      h="100%"
      zIndex={0}
      top={0}
      position={"fixed"}
      left="0"
      w="80px"
      bgColor={"boxBackground"}
    >
      {/* CONFIG */}
      <MotionIconButton
        top="50%"
        color="#CC5476"
        bgColor={"transparent"}
        _hover={{ backgroundColor: "transparent", color: "#cf3862" }}
        _active={{ background: "transparent" }}
        whileHover={{rotate:30}}
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

          {/* ADD NEW EXPENSE */}
      <MotionIconButton
        top="50%"
        color="#CC5476"
        bgColor={"transparent"}
        _hover={{ backgroundColor: "transparent", color: "#cf3862" }}
        _active={{ background: "transparent" }}
        whileHover={{scale:1.15}}
        transition={{ duration: 0.1 }}
        onClick={() => goToConfig}
      >
        <FontAwesomeIcon
          style={{
            width: "25px",
            height: "25px",
          }}
          icon={faPlusCircle}
        />
      </MotionIconButton>
    </VStack>
  );
};

export default Sidebar;
