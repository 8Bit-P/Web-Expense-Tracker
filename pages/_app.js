import "../styles/globals.css";

import { Authcontext } from "../context/AuthContext";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import myNewTheme from "../styles/theme";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Authcontext.Provider value={{email:null,userId:null}}>
      <SessionProvider session={session}>
        <ChakraProvider theme={myNewTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </Authcontext.Provider>
  );
}

export default MyApp;
