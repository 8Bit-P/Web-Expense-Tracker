import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { useState, useRef } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Box } from "@chakra-ui/react";

const MonthlyExpenseGraph = () => {
  const DATA_COUNT = 3;

  const labels = ["Jan", "Feb", "Mar"];

  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "Something",
        data: [1, 3, 4],
        backgroundColor:"#989BCD",
        borderColor:"#989BCD",
        borderWidth:5,
       
      },
    ],
  });



  return (
    <Box h="300px" w="600px" bgColor={"boxBackground"} ml="120px">
      <Line data={data} options={{}} />
    </Box>
  );
};

export default MonthlyExpenseGraph;
