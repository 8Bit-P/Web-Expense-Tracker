import { VStack, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";
import axios from "axios";

import { useMediaQuery } from "@react-hook/media-query";
import { useState, useContext, useEffect } from "react";
import { UtilsContext } from "../context/UtilsContext";
import { getSession } from "next-auth/react";

import DesktopDashboard from "../components/main/DesktopDashboard";
import MobileDashBoard from "../components/main/MobileDashBoard";

export default function Home({ user }) {
  const isLowRes = useMediaQuery("(max-width:900px)");
  const utils = useContext(UtilsContext);

  useEffect(() => {
    utils.email = user.email;
  }, [user]);

  //pagination
  const [expenses, setExpenses] = useState([]);
  const [isExpensesLoading, setIsExpensesLoading] = useState(true);

  /* TODO: make into hook */
  const fetchExpenses = async () => {
    setIsExpensesLoading(true);
    axios
      .post("http://localhost:3000/api/getExpenses", { email: utils.email })
      .then((res) => {
        setExpenses(res.data);
        /* SOME KIND OF SORTING METHOD */
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

  /* INFO: Expenses and pagination calculation */
  const [currentPage, setCurrentPage] = useState(1); // 1 - total
  const [totalPages, setTotalPages] = useState(1);
  const [currentExpenses, setCurrentExpenses] = useState([]);

  const MAX_EXPENSES_DISPLAY = 5;

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

  /* INFO: SIDEBAR MODAL HOOK */
  const { isOpen, onOpen, onClose } = useDisclosure();

  /* INFO: COMPONENT */
  return (
    <VStack
      align={isLowRes ? "center": "left"}
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

      {!isLowRes ? (
        <DesktopDashboard
          username={user.name}
          profilePicture={user.image}
          expenses={expenses}
          fetchExpenses={fetchExpenses}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          isExpensesLoading={isExpensesLoading}
          currentExpenses={currentExpenses}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <MobileDashBoard
          username={user.name}
          profilePicture={user.image}
          expenses={expenses}
          fetchExpenses={fetchExpenses}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          isExpensesLoading={isExpensesLoading}
          currentExpenses={currentExpenses}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </VStack>
  );
}

/* INFO: GetServerSideProps */
import prisma from "../lib/prisma";

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
