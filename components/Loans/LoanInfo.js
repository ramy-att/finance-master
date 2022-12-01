import Table from "react-bootstrap/Table";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useState, useEffect } from "react";
const LoanInfo = (props) => {
  const { data } = props;
  const [pays, setPayments] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [options, setOptions] = useState(null);
  const [showChart, setShowChart] = useState(false);

  // useEffect(() => {
  //   if (data && data.payments.length!==0) {
  //     console.log(data.payments)
  //     const payments = data.payments;
  //     setPayments(payments);
  //     const labels = [];
  //     for (let i = 1; i <= payments.length; i++) {
  //       labels.push(`Payment ${i}`);
  //     }
  //     const colors = "green";
  //     const data = {
  //       labels,
  //       datasets: [
  //         {
  //           label: "Loan",
  //           data: [...pays],
  //           borderColor: colors,
  //           backgroundColor: colors,
  //         },
  //       ],
  //     };
  //     setChartData(data);
  //     setOptions({
  //       responsive: true,
  //       plugins: {
  //         legend: {
  //           position: "top",
  //         },
  //         title: {
  //           display: true,
  //           text: "Results",
  //         },
  //       },
  //     });
  //     setShowChart(true);
  //   }
  // }, [data]);

  return (
    <>
      <div className="interestTable">
        <Table striped="columns">
          <thead>
            <tr>
              <th>Payment #</th>
              <th>Payment Amount</th>
              <th>Interest Paid</th>
              <th>Principal Paid</th>
              <th>Paid To Date</th>
            </tr>
          </thead>
          <tbody>
            {data.payments.map((value, idx) => {
              return (
                <tr>
                  <td>{idx + 1}</td>
                  <td>
                    {value.payment
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                  <td>
                    {value.interest
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                  <td>
                    {value.principal
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                  <td>
                    {value.paidToDate
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {/* {showChart && chartData !== null && (
        <Line
          className="lineChartContainer"
          options={options}
          data={chartData}
        />
      )} */}
      <div>
        <div>
          Loan Amount: $
          {data.initialOwed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
        <div>
          Total Interest: $
          {data.totalInterest.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
        <div>
          Total Paid: $
          {data.totalPaid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
      </div>
    </>
  );
};
export default LoanInfo;
