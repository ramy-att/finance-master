import React from "react";
import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export function ChartSection(props) {
  const { incomes, expenses } = props;
  const [datasets, setDataSets] = useState([]);
  useEffect(() => {
    const array = [];
    const reds = ["#8B0000", "#8B3000", "#8B1000", "#8B5000"];
    const greens = ["#8db042", "#4db026", "#3db046", "#9db056"];
    let c = 0;
    let c2 = 0;
    Object.entries(expenses).map(([key, val]) => {
      array.push({
        label: val.CategoryTitle,
        data: [0, val.CategoryAmount],
        backgroundColor: reds[c % reds.length],
      });
      c++;
    });
    Object.entries(incomes).map(([key, val]) => {
      array.push({
        label: val.Category,
        data: [
          val.Freq == "Daily"
            ? parseFloat(val.Amount) * 365
            : val.Freq == "Weekly"
            ? parseFloat(val.Amount) * 52
            : val.Freq == "Biweekly"
            ? parseFloat(val.Amount) * 26
            : val.Freq == "Monthly"
            ? parseFloat(val.Amount) * 12
            : val.Freq == "Quarterly"
            ? parseFloat(val.Amount) * 4
            : val.Freq == "Semi-Annually"
            ? parseFloat(val.Amount) * 2
            : parseFloat(val.Amount),
          0,
        ],
        backgroundColor: greens[c2 % greens.length],
      });
      c2++;
    });
    setDataSets([...array]);
  }, [incomes, expenses]);
  const labels = ["Incomes", "Expenses"];
  const data = {
    labels,
    datasets: [...datasets],
  };
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Income VS Expenses Annually",
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
  return datasets.length>0 && <Bar options={options} data={data} />;
}