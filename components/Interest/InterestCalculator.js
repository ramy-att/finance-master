import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import TypeNavBar from "./TypeNavBar";
import { useState, useEffect } from "react";
import FutureAmount from "./FutureAmount";
import PresentAmount from "./PresentAmount";
import YearsAmount from "./YearsAmount";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const InterestCalculator = () => {
  const [formType, setFormType] = useState("future");
  const [results, setResults] = useState();
  const [annualResults, setAnnualResults] = useState(null);
  const [labels, setLabels] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [options, setOptions] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const resultsHandler = (x) => {
    setResults(x);
  };
  const formTypeHandler = (x) => {
    setFormType(x);
  };
  const clearData = () => {
    setShowChart(false);
    setOptions(null);
    setChartData(null);
    setLabels(null);
    setAnnualResults(null);
    setResults();
  };
  useEffect(() => {
    if (results && formType !== "years") {
      const annual = results.annualData;
      setAnnualResults(annual);
      console.log(annual);
      const labels = [];
      for (let i = 1; i <= annual.length; i++) {
        labels.push(`Year ${i}`);
      }
      setLabels(labels);
      const colors = results.investment > 0 ? "green" : "red";
      const data = {
        labels,
        datasets: [
          {
            label: "Investment",
            data: [...annual],
            borderColor: colors,
            backgroundColor: colors,
          },
        ],
      };
      setChartData(data);
      setOptions({
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Results",
          },
        },
      });
      setShowChart(true);
    }
  }, [results]);

  return (
    <Container fluid>
      <div className="interestCalcPage">
        <Row>
          <Col>
            <div className="titleContainer">
              <h1>Interest Calculator</h1>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <div>
              <h2>Calculator</h2>
            </div>
            <div className="InterestCalcLeft">
              <div className="InterestCalcOptions">
                <span
                  onClick={() => {
                    formTypeHandler("future");
                    clearData();
                  }}
                >
                  Future Amount
                </span>
                <span
                  onClick={() => {
                    formTypeHandler("present");
                    clearData();
                  }}
                >
                  Present Amount
                </span>
                <span
                  onClick={() => {
                    formTypeHandler("years");
                    clearData();
                  }}
                >
                  Years Required
                </span>
              </div>
              {formType === "future" ? (
                <FutureAmount resultsHandler={resultsHandler} />
              ) : formType === "present" ? (
                <PresentAmount resultsHandler={resultsHandler} />
              ) : formType === "years" ? (
                <YearsAmount resultsHandler={resultsHandler} />
              ) : null}
              <p className="interestDic">
                * Calculations take in consideration inflation rate and
                contributions amounts only if a non-zero value is entered *
              </p>
            </div>
          </Col>
          <Col>
            <div>
              <h2>Results</h2>
            </div>
            <div>
              {results && formType === "future" && (
                <>
                  {" "}
                  <div className="interestTable">
                    <Table striped="columns">
                      <thead>
                        <tr>
                          <th>Year</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody className="interestTable">
                        {annualResults !== null &&
                          annualResults.map((x, idx) => {
                            return (
                              <tr>
                                <td>Year {idx + 1}</td>
                                <td>${x}</td>
                              </tr>
                            );
                          })}
                        <tr className="taxesInTable">
                          <td>Taxes</td>
                          <td>${results.taxes.toFixed(2)}</td>
                        </tr>
                        <tr
                          className={
                            results.investment > 0
                              ? "gainedAmount"
                              : "lostAmount"
                          }
                        >
                          <td>Gain/Loss</td>
                          <td>${results.investment.toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </>
              )}
              {results && formType === "present" && (
                <>
                  <div className="interestTable">
                    <Table striped="columns">
                      <thead>
                        <tr>
                          <th>Year</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {annualResults &&
                          annualResults.map((x, idx) => {
                            return (
                              <tr>
                                <td>Year {idx + 1}</td>
                                <td>${x}</td>
                              </tr>
                            );
                          })}
                        <tr>
                          <td>Taxes</td>
                          <td>${results.taxes.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td>Gain/Loss</td>
                          <td>${results.investment.toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </>
              )}
              {console.log(chartData)}
              {showChart && chartData !== null && (
                <Line
                  className="lineChartContainer"
                  options={options}
                  data={chartData}
                />
              )}
              {results && formType == "years" && (
                <p>
                  You would need {results.length} years to reach your target of
                  ${results.future}, given a principal of ${results.principal},
                  at a rate of {results.rate}%.
                </p>
              )}
              {!results && <h3 className="text-center">No Results Yet</h3>}
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};
export default InterestCalculator;
