import "../styles/globals.css";

import { UtilsContext } from "../context/UtilsContext";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import myNewTheme from "../styles/theme";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <UtilsContext.Provider value={{email:null,userId:null}}>
      <SessionProvider session={session}>
        <ChakraProvider theme={myNewTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </UtilsContext.Provider>
  );
}

export default MyApp;
