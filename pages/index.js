import { Heading, HStack, VStack, Text, Button, Box } from "@chakra-ui/react";
import Head from "next/head";
import ExpensesList from "../components/expenses/ExpensesList";

import Navbar from "../components/main/Navbar";
import Pagination from "../components/main/Pagination";
import Sidebar from "../components/main/Sidebar";

import { useState, useContext, useEffect } from "react";
import { UtilsContext } from "../context/UtilsContext";

import { getSession } from "next-auth/react";

import axios from "axios";

export default function Home({ user }) {

  const utils = useContext(UtilsContext);

  /* necessary? */
  const [username, setUsername] = useState(user.name);
  const [profilePicture, setProfilePicture] = useState(user.image);

  useEffect(() => {
    utils.email = user.email;
  }, [user]);

  //pagination 

  const [expenses, setExpenses] = useState([])
  const [isExpensesLoading, setIsExpensesLoading] = useState(false)

  const fetchExpenses = async () => {
    setIsExpensesLoading(true);
    axios.post("http://localhost:3000/api/getExpenses",{email:utils.email}).then(res => {
      setExpenses(res.data);
      console.log(res.data);
      setIsExpensesLoading(false);

      //set corresponding pages
      setTotalPages(Math.max(Math.ceil(res.data.length/4),1))
      adjustCurrentExpenses();

    }).catch(err => {
      console.log(err);
    })
  }

  //load expenses once page has loaded
  useEffect(() => {
    fetchExpenses();
  }, [])
  

  /* TODO: expenses and pagination calculation */
  const [currentPage, setCurrentPage] = useState(1); // 1 - total
  const [totalPages, setTotalPages] = useState(1);
  const [currentExpenses, setCurrentExpenses] = useState([])

  const MAX_EXPENSES_DISPLAY = 4;

  useEffect(() => {
    //each time page is changed update expenses
    adjustCurrentExpenses();
  }, [currentPage])
  

  const adjustCurrentExpenses = () => {
    const endingIndex = Math.min(expenses.length,currentPage*MAX_EXPENSES_DISPLAY)
    const beginingIndex = Math.max(0,endingIndex-MAX_EXPENSES_DISPLAY)

    console.log(`range min ${beginingIndex}, max ${endingIndex}`)
    console.log(expenses.slice(beginingIndex,endingIndex))
    setCurrentExpenses(expenses.slice(beginingIndex,endingIndex));
  }


  return (
    <VStack
      align={"left"}
      pb="50px"
      bgColor={"background"}
      h="100%"
      minH="100vh"
      color="fontColor"
      spacing="10"
    >
      <Head>
        <title>MyExpenses - Home</title>
        <meta
          name="Track all your expenses and incomes"
          content="WebApp to track your expenses"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar name={username} avatar={profilePicture} />
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

      <VStack align="left" pb="10">
        <ExpensesList expenses={currentExpenses} />
        <Pagination total={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </VStack>

      <VStack align="left">
        <Text ml="120px" fontWeight={"500"}>
          ADDITIONAL INFORMATION
        </Text>
        <HStack spacing="6">
          <Box h="300px" w="500px" bgColor={"boxBackground"} ml="120px" />
          <Box h="300px" w="600px" bgColor={"boxBackground"} ml="120px" />
        </HStack>
      </VStack>
    </VStack>
  );
}

import prisma from "../lib/prisma";


export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { user } = session;

  console.log("login session:");
  console.log(session);
  let prismaUser = await prisma.user.findFirst({
    where: {
      email: user.email,
    },
  });

  //user not registered
  if(!prismaUser){
    //create account
    prismaUser = await prisma.user.create({
      data:{
        username:user.name,
        email:user.email,
        balance:0
      }
    })
  }

  console.log("login user:");
  console.log(prismaUser);



  return {
    props: {
      user
    },
  };
};
