import { Grid, GridItem, VStack } from "@chakra-ui/react";
import Head from "next/head";


import ExpenseList from "../components/main/ExpenseList";

import Navbar from "../components/main/Navbar";
import ExpensesSection from "../components/sections/ExpensesSection";
import MonthlyExpensesSection from "../components/sections/MonthlyExpensesSection";
import ProfileSection from "../components/sections/ProfileSection";
import SideMenuSection from "../components/sections/SideMenuSection";
import StatusSection from "../components/sections/StatusSection";

export default function Home() {
  return (
    <VStack bgColor={"background"} h="100vh" p="5">
      <Head>
        <title>MyExpenses - Home</title>
        <meta
          name="Track all your expenses and incomes"
          content="WebApp to track your expenses"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Grid
        templateColumns="300px 1fr 1fr"
        templateRows="90px 2fr 3fr"
        templateAreas={`"header header"
                        "nav graphs"
                        "nav expenses"`}
        gap={6}
        w="100%"
        /* maxW={"1800px"} */
        h="100%"
        color={"fontColor"}
      >
        <GridItem rowStart={1} colStart={1}>
          <ProfileSection name="Walter Hartwell White" balance="122000000.34" />
        </GridItem>

        <GridItem rowStart={1} colStart={2} colSpan={2}>
          <StatusSection/>
        </GridItem>

        <GridItem gridArea={"nav"}>
          <SideMenuSection/>
        </GridItem>

        <GridItem colStart={2} rowStart={2}>
          <MonthlyExpensesSection/>
        </GridItem>

        <GridItem colStart={3} rowStart={2}>
          <MonthlyExpensesSection/>
        </GridItem>

        <GridItem colStart={2} rowStart={3} colSpan={2}>
          <ExpensesSection/>
        </GridItem>


      </Grid>
    </VStack>
  );
}
