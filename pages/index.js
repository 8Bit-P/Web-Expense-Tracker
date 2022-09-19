import { VStack, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";
import useExpenses from "../hooks/useExpenses";
import { useMediaQuery } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { UtilsContext } from "../context/UtilsContext";
import { getSession } from "next-auth/react";

import DesktopDashboard from "../components/main/DesktopDashboard";
import MobileDashBoard from "../components/main/MobileDashBoard";

export default function Home({ user }) {
  const [isWideScreen] = useMediaQuery("(min-width: 900px)");
  const utils = useContext(UtilsContext);

  /* INFO: sorting state */
  const [sortMethod, setSortMethod] = useState("recent")

  const updateSortingMethod = (val) => {
    setSortMethod(val);
    console.log("set to: " + val);
  }

  useEffect(() => {
    utils.email = user.email;
  }, [user]);

  //pagination

  const {
    expenses,
    isExpensesLoading,
    error,
    fetchExpenses,
    totalPages,
    currentPage,
    setCurrentPage,
    currentExpenses,
    adjustCurrentExpenses
  } = useExpenses(sortMethod);


  useEffect(() => {
    //each time page is changed update expenses
    /* TODO: check if if is neccessary */
    if (!isExpensesLoading) adjustCurrentExpenses(expenses);
  }, [currentPage]);

  

  /* INFO: SIDEBAR MODAL HOOK */
  const { isOpen, onOpen, onClose } = useDisclosure();

  /* INFO: COMPONENT */
  return (
    <VStack
      align={!isWideScreen ? "center" : "left"}
      pb={isWideScreen && "50px"}
      bgColor={"background"}
      h="100%"
      minH="100vh"
      color="fontColor"
      spacing={isWideScreen ? 10 : 5}
    >
      <Head>
        <title>MyExpenses - Home</title>
        <meta
          name="Track all your expenses and incomes"
          content="WebApp to track your expenses"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isWideScreen ? (
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
          updateSortingMethod={updateSortingMethod}
        />
      ) : (
        <MobileDashBoard
          username={user.name}
          profilePicture={user.image}
          expenses={expenses}
          fetchExpenses={fetchExpenses}
          isExpensesLoading={isExpensesLoading}
          currentExpenses={currentExpenses}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          updateSortingMethod={updateSortingMethod}
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
        monthlyLimit: 0,
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
