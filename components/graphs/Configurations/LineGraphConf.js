export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "rgba(255,255,255,0.8)",
        font: {
          size: 15,
        },
        usePointStyle:true,
        pointStyle:"line",
      },
    },
  },
  scales: {
    yAxes: {
      title:{
        display:true,
        text:"Amount (€)",
        color:"rgba(255,255,255,0.8)",
        font:{
          size:13
        }
      },
      grid: {
        drawBorder: true,
        color: "rgba(255,255,255,0.3)",
      },
      ticks: {
        beginAtZero: true,
        color: "rgba(255,255,255,0.8)",
        font: {
          size: 13,
        },
        callback: function (value, index, ticks) {
          return value + " €";
        },
      },
    },
    xAxes: {
      title:{
        display:true,
        text:"Day of the month",
        color:"rgba(255,255,255,0.8)",
        font:{
          size:13
        }
      },
      grid: {
        drawBorder: true,
        color: "rgba(255,255,255,0.3)",
      },
      ticks: {
        beginAtZero: true,
        color: "rgba(255,255,255,0.8)",
        autoSkip: true,
        maxTicksLimit: 15,
        font: {
          size: 13,
        }
      },
    },
  },
};
