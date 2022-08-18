import { HStack,Text } from '@chakra-ui/react'
import React from 'react'

const Navbar = () => {
  return (
    <HStack h="10" w="100%" color="white">
        <Text ml="10" fontWeight={"600"} fontSize="xl">MyExpenses</Text>
    </HStack>
  )
}

export default Navbar