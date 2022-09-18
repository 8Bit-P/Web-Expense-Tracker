import { Box, Container, IconButton } from "@chakra-ui/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const MobileMenu = ({onOpen}) => {
  return (
    <Container w="100%" p="0" pt="10">
      <Box
        w="100%"
        h="100px"
        borderTopRadius={"40px"}
        bgColor="boxBackground"
        boxShadow={
          "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;"
        }
      >
        <Box
          w="75px"
          h="75px"
          borderRadius={"100%"}
          backgroundColor="background"
          left="50%"
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
      </Box>
    </Container>
  );
};

export default MobileMenu;
