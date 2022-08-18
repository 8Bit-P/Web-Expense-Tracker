import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "Dark",
  useSystemColorMode: false,
};

const colors = {
  background:"#14132A",
  boxBackground:"#2A2A48",
  primary: "#F49A70",
  secondary: "#545665",
  fontColor:"#DADBE0",
};

const fonts = {

};

const myNewTheme = extendTheme({ config, colors, fonts });

export default myNewTheme;
