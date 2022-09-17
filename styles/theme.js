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
  customPurple:"#6A59A2",
  customCyan:"#39AFE2",
  customGreen:"#3FC4B7",
  customBlue:"#2F52D1",
  customPink:"#C12D90",
  modal:"#131923",
};

const fonts = {
  heading:'Exo 2',
  body:'Exo 2'
};

const myNewTheme = extendTheme({ config, colors, fonts });

export default myNewTheme;
