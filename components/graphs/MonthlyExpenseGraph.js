import { Line } from "react-chartjs-2";
import { useState, useRef, useEffect } from "react";
import { Chart as ChartJS } from "chart.js/auto"; /* WARNING: NEEDED IMPORT */
import { Box } from "@chakra-ui/react";
import { options } from "./Configurations/LineGraphConf";

const MonthlyExpenseGraph = ({ expenses}) => {

  const createArrayRef = useRef(false);
  const [labels, setLabels] = useState([]);

  function getDaysInCurrentMonth() {
    const date = new Date();

    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  //array creation for months
  useEffect(() => {
    if (createArrayRef.current == true) return;
    createArrayRef.current = true; //prevent updating twice in strict mode
    let tempLabels = [];
    for (let i = 1; i <= getDaysInCurrentMonth(); i++) tempLabels.push(i);
    setLabels(tempLabels);
  }, []);

  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "Daily Expense (€)",
        data: [0],
        backgroundColor: "#989BCD",
        borderColor: "#989BCD",
        borderWidth: 3,
      },
    ],
  });

  //current month expenses
  useEffect(() => {
    const filteredExpenses = expenses.filter(
      (expense) =>
        new Date(expense.date).getMonth() === new Date().getMonth() &&
        new Date(expense.date).getFullYear() === new Date().getFullYear()
    );

    //create full month array with 0 on all days
    let finalMonthExpenses = [];

    for (let i = 0; i < getDaysInCurrentMonth(); i++) {
      finalMonthExpenses.push(0);
    }

    //substitute days with expenses on array with respective amounts
    for (let i = 0; i < filteredExpenses.length; i++) {
      const index = new Date(filteredExpenses[i].date).getDate();
      finalMonthExpenses[index - 1] += filteredExpenses[i].amount;
    }


    const newData = {
      labels: labels,
      datasets: [
        {
          label: "Daily Expense (€)",
          data: finalMonthExpenses,
          backgroundColor: "#989BCD",
          borderColor: "#989BCD",
          borderWidth: 3,
          tension: 0,
        },
      ],
    };

    setData((data) => ({
      ...data,
      ...newData,
    }));
  }, [expenses]);

  /* TODO: select month to show data */
  return (
    <Box
      w={"75%"}
      minWidth={"700px"}
      maxW="1000px"
      p="2"
      bgColor={"boxBackground"}
      borderRadius="xl"
      borderWidth={"2px"}
      borderColor={"customPurple"}
    >
      <Line data={data} options={options} redraw={true} />
    </Box>
  );
};

export default MonthlyExpenseGraph;
