import React from 'react'
import { Button, Heading, VStack } from '@chakra-ui/react'
import { useSession,signIn} from 'next-auth/react'
import { useRouter } from 'next/router';

function login() {

    const {data: session, status} = useSession();
    const router = useRouter();
    
    if(status !== 'loading' && status === 'authenticated'){
        //we shouldn't be in this page
        router.push('/')
    }
    
  return (
    <VStack bgColor={"background"} h="100vh" color="fontColor">
        <Heading>
            MyExpenses
        </Heading>

        <Button colorScheme={"messenger"} onClick={() => signIn('github')}>
            Login With GitHub
        </Button>
    </VStack>
  )
}

export default login