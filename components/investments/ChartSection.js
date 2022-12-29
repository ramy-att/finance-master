import React from "react";
import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export function ChartSection(props) {
  const { investments } = props;
  const labels = ["GICs", "Market", "Crypto"];
  const [datasets, setDataSets] = useState([]);
  // Data:= [GICs, Market, Crypto]
  useEffect(() => {
    const array = [];
    Object.entries(investments).map(([key, val]) => {
      const amount =
        val.type == "GIC/CD"
          ? val.amount
          : val.type == "Stocks"
          ? parseFloat(val.stockPrice) * parseFloat(val.numberStocks)
          : parseFloat(val.coinPrice) * parseFloat(val.numberCoins);
      array.push({
        label: `${val.bank}:$${amount}`,
        data:
          val.type == "GIC/CD"
            ? [amount]
            : val.type == "Stocks"
            ? [0, amount, 0]
            : [0, 0, amount],
      });
    });
    setDataSets(array);
  }, [investments]);
  const data = {
    labels,
    datasets: [...datasets],
  };
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Investments at Purchase",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  return <Bar options={options} data={data} />;
}
