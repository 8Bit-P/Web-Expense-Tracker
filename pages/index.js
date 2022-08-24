import { Heading, HStack, VStack, Text, Button, Box } from "@chakra-ui/react";
import Head from "next/head";
import ExpensesList from "../components/expenses/ExpensesList";

import Navbar from "../components/main/Navbar";
import Pagination from "../components/main/Pagination";
import Sidebar from "../components/main/Sidebar";

export default function Home({ expenses }) {
  return (
    <VStack align={"left"} bgColor={"background"} h="100vh" color="fontColor" spacing="5">
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

      <HStack w="100%" pt="100px" spacing="10">
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


      <ExpensesList/>
      <Pagination total={10}/>
    </VStack>
  );
}

import prisma from "../lib/prisma";

export const getServerSideProps = async () => {
  let expenses = await prisma.expense.findMany();
  expenses = JSON.parse(JSON.stringify(expenses));

  return {
    props: {
      expenses: { expenses },
    },
  };
};
