import {
  Heading,
  HStack,
  VStack,
  Text,
  Button,
  Box,
  Skeleton,
} from "@chakra-ui/react";
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

  const [expenses, setExpenses] = useState([]);
  const [isExpensesLoading, setIsExpensesLoading] = useState(true);

  const fetchExpenses = async () => {
    setIsExpensesLoading(true);
    axios
      .post("http://localhost:3000/api/getExpenses", { email: utils.email })
      .then((res) => {
        setExpenses(res.data);
        setIsExpensesLoading(false);

        //set corresponding pages
        let tempTotalPages = Math.max(
          Math.ceil(res.data.length / MAX_EXPENSES_DISPLAY),
          1
        );
        setTotalPages(tempTotalPages);
        adjustCurrentExpenses(res.data);

        if (currentPage > tempTotalPages) {
          let temp = currentPage - 1;
          setCurrentPage(temp);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //load expenses once page has loaded
  useEffect(() => {
    fetchExpenses();
  }, []);

  /* Expenses and pagination calculation */
  const [currentPage, setCurrentPage] = useState(1); // 1 - total
  const [totalPages, setTotalPages] = useState(1);
  const [currentExpenses, setCurrentExpenses] = useState([]);

  const MAX_EXPENSES_DISPLAY = 4;

  useEffect(() => {
    //each time page is changed update expenses
    if (!isExpensesLoading) adjustCurrentExpenses(expenses);
  }, [currentPage]);

  const adjustCurrentExpenses = (exp) => {
    const beginingIndex = (currentPage - 1) * MAX_EXPENSES_DISPLAY;
    const endingIndex = Math.min(
      beginingIndex + MAX_EXPENSES_DISPLAY,
      exp.length
    );
    setCurrentExpenses(exp.slice(beginingIndex, endingIndex));
  };

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
      <Sidebar fetchExpenses={fetchExpenses} />

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
        {isExpensesLoading ? (
          <VStack
            pt="50px"
            pb="25px"
            w="80%"
            maxW="1250px"
            pl="120px"
            spacing="5"
          >
            <Skeleton w="100%" h="20px" />

            <Skeleton w="100%" h="50px" />
            <Skeleton w="100%" h="50px" />
            <Skeleton w="100%" h="50px" />
            <Skeleton w="100%" h="50px" />
          </VStack>
        ) : (
          <ExpensesList
            expenses={currentExpenses}
            fetchExpenses={fetchExpenses}
          />
        )}

        <Pagination
          total={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </VStack>

      <VStack align="left">
        <Text ml="120px" fontWeight={"500"}>
          ADDITIONAL INFORMATION
        </Text>
        <VStack align="left" spacing="6" pl="120px">
          <MonthlyExpenseGraph expenses={expenses}/>
        </VStack>
      </VStack>
    </VStack>
  );
}

import prisma from "../lib/prisma";
import MonthlyExpenseGraph from "../components/graphs/MonthlyExpenseGraph";

/* LOGIN HANDLING */
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

  /*   console.log("login session:");
  console.log(session); */
  let prismaUser = await prisma.user.findFirst({
    where: {
      email: user.email,
    },
  });

  //user not registered
  if (!prismaUser) {
    //create account
    prismaUser = await prisma.user.create({
      data: {
        username: user.name,
        email: user.email,
        balance: 0,
      },
    });
  }

  /*   console.log("login user:");
  console.log(prismaUser); */

  return {
    props: {
      user,
    },
  };
};
