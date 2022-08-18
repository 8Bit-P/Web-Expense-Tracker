import '../styles/globals.css'

import { ChakraProvider } from '@chakra-ui/react'
import myNewTheme from '../styles/theme'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={myNewTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
