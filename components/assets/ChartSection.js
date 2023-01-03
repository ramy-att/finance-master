import React from "react";
import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export function ChartSection(props) {
  const { cash } = props;
  const [datasets, setDataSets] = useState([]);
  useEffect(() => {
    const array = [];
    const greens = ["#8db042", "#5db026", "#4db026", "#3db046", "#9db056"];
    let c = 0;
    Object.entries(cash).map(([key, val]) => {
      array.push({
        label: val.AccountName || val.Type,
        data: val.Bank
          ? [val.Amount, 0, 0]
          : val.Type == "Asset"
          ? [0, val.Amount, 0]
          : [0, 0, val.Amount],
        backgroundColor: greens[c % greens.length],
      });
      c++;
    });
    setDataSets([...array]);
  }, [cash]);
  const labels = ["Bank", "Assets", "Else"];
  const data = {
    labels,
    datasets: [...datasets],
  };
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Assets & Cash",
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
  return datasets.length > 0 && <Bar options={options} data={data} />;
}
