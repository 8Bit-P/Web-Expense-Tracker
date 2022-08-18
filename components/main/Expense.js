import { Box, HStack,Spacer,Text } from '@chakra-ui/react'
import React from 'react'

const Expense = () => {
  return (
    <HStack bgColor={"boxBackground"} p="5" w="80%" borderRadius={"5px"}>
        <Box>Icon</Box>
        <Text>Some text</Text>
        <Spacer/>
        <Text>5€ </Text>
    </HStack>
  )
}

export default Expense