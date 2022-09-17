import { Button } from "@chakra-ui/react";
import React from "react";

const FloatingAddButton = () => {
  return (
    <Button
      zIndex={10}
      bottom="20px"
      transform="translate(-50%,-50%)"
      margin="0 auto"
      left="50%"
      colorScheme={"messenger"}
      borderRadius="100%"
    >
      +
    </Button>
  );
};

export default FloatingAddButton;
