import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "Dark",
  useSystemColorMode: false,
};

const colors = {
  background:"#28344D",
  boxBackground:"#333E5C",
  primary: "#CC5476",
  secondary: "#545665",
  fontColor:"#DADBE0",
  customPurple:"#989BCD",
  customCyan:"#8CBEDF",
  customGreen:"#C4DFC2"
};

const fonts = {
  heading:'Exo 2',
  body:'Exo 2'
};

const myNewTheme = extendTheme({ config, colors, fonts });

export default myNewTheme;
