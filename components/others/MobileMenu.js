import { Box, Container, HStack, IconButton } from "@chakra-ui/react";
import React from "react";
import { signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const MotionHStack = motion(HStack);

const MobileMenu = ({onOpen}) => {
  return (
    <Container w="90%" p="0" pt="10">
      <MotionHStack
        w="100%"
        h="100px"
        borderTopRadius={"40px"}
        bgColor="boxBackground"
        boxShadow={
          "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;"
        }
        p="5"
        initial={{opacity:0}}
        animate={{opacity:[0,1]}}
        transition={{delay:2}}
      >
        <IconButton
          position={"absolute"}
          transform="translate(-50%,-50%)"
          bottom="-10px"
          left="50%"
          color="#CC5476"
          bgColor={"transparent"}
          _hover={{ backgroundColor: "transparent", color: "#cf3862" }}
          _active={{ background: "transparent" }}
          onClick={() => signOut()}
        >
          <FontAwesomeIcon
            style={{
              width: "25px",
              height: "25px",
            }}
            icon={faRightFromBracket}
          />
        </IconButton>
        <Box
          w="75px"
          h="75px"
          borderRadius={"100%"}
          backgroundColor="background"
          left="49%"
          bottom="15px"
          position={"absolute"}
          transform={"translate(-50%, -50%)"}
          margin="0 auto"
        >
          <IconButton
            w="50px"
            h="50px"
            colorScheme={"purple"}
            borderRadius="100%"
            boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
            margin="0 auto"
            zIndex={20}
            left="50%"
            top="50%"
            transform={"translate(-50%, -50%)"}
            onClick={onOpen}
          >
            <FontAwesomeIcon
              style={{
                width: "20px",
                height: "20px",
              }}
              icon={faPlus}
            />
          </IconButton>
        </Box>
      </MotionHStack>
    </Container>
  );
};

export default MobileMenu;
