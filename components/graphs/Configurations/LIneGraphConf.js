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
      },
    },
  },
  scales: {
    yAxes: {
      grid: {
        drawBorder: true,
        color: "rgba(255,255,255,0.3)",
      },
      ticks: {
        beginAtZero: true,
        color: "rgba(255,255,255,0.8)",
        fontSize: 12,
      },
    },
    xAxes: {
      grid: {
        drawBorder: true,
        color: "rgba(255,255,255,0.3)",
      },
      ticks: {
        beginAtZero: true,
        color: "rgba(255,255,255,0.8)",
        fontSize: 12,
        autoSkip: true,
        maxTicksLimit: 15,
      },
    },
  },
};
