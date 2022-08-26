import { Heading, HStack, VStack, Text, Button, Box } from "@chakra-ui/react";
import Head from "next/head";
import ExpensesList from "../components/expenses/ExpensesList";

import Navbar from "../components/main/Navbar";
import Pagination from "../components/main/Pagination";
import Sidebar from "../components/main/Sidebar";

import {getSession} from "next-auth/react"

export default function Home({ user }) {

    console.log(user);

  return (
    <VStack align={"left"} pb="50px" bgColor={"background"} h="100%" minH="100vh" color="fontColor" spacing="10">
      <Head>
        <title>MyExpenses - Home</title>
        <meta
          name="Track all your expenses and incomes"
          content="WebApp to track your expenses"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Sidebar />

      <HStack w="100%" pt="150px" spacing="10">
        <VStack align="left" spacing="5" maxW={"400px"} ml="120px">
          <VStack align={"left"} spacing="0">
            <Heading>Welcome to your</Heading>{" "}
            <Heading
              background={"-webkit-linear-gradient(45deg,#CC5476, #989BCD)"}
              backgroundClip="text"
            >
              Dashboard!
            </Heading>

          </VStack>
          <Text>
            Take a general view of your expenses and manage some of your data
            through this window
          </Text>
          <HStack>
            <Button
              w="45px"
              h="45px"
              bgColor={"primary"}
              borderWidth="3px"
              borderColor={"primary"}
              _hover={{ backgroundColor: "transparent" }}
              _active={{ backgroundColor: "transparent" }}
              fontWeight="600"
            >
              <Heading mb="2">+</Heading>
            </Button>
            <Text color="primary" fontWeight={"400"}>
              Add some goals for the month!
            </Text>
          </HStack>
        </VStack>

        <Box w="200px" h="300px" bgColor="customPurple" borderRadius={"30px"} />
        <Box w="200px" h="300px" bgColor="customGreen" borderRadius={"30px"} />
        <Box w="200px" h="300px" bgColor="customCyan" borderRadius={"30px"} />
      </HStack>


      <VStack align="left" pb="10">
        <ExpensesList/>
        <Pagination total={11}/>
      </VStack>

      <VStack align="left">
        <Text ml="120px" fontWeight={"500"}>ADDITIONAL INFORMATION</Text>
        <HStack spacing="6">
          <Box h="300px" w="500px" bgColor={"boxBackground"} ml="120px"/>
          <Box h="300px" w="600px" bgColor={"boxBackground"} ml="120px"/>
          
        </HStack>
      </VStack>
    </VStack>
  );
}

/* import prisma from "../lib/prisma"; */

export const getServerSideProps = async (context ) => {

  const session = await getSession(context);
  if(!session){
    return{
      redirect:{
        destination: "/login",
        permanent: false
      }
    }
  }

  const {user} = session;

  return {
    props:{
      user
    }
  }
  
  /* let expenses = await prisma.expense.findMany();
  expenses = JSON.parse(JSON.stringify(expenses));

  return {
    props: {
      expenses: { expenses },
    },
  }; */
};
