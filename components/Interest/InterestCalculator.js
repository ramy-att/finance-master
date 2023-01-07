import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { utils, writeFileXLSX } from "xlsx";
import FutureAmount from "./FutureAmount";
import PresentAmount from "./PresentAmount";
import YearsAmount from "./YearsAmount";

const InterestCalculator = () => {
  const [formType, setFormType] = useState("future");
  const [results, setResults] = useState();
  const [annualResults, setAnnualResults] = useState(null);
  const [labels, setLabels] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [options, setOptions] = useState(null);
  const [showChart, setShowChart] = useState(false);

  const table = useRef(null);

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
      const labels = [];
      if (formType == "present") {
        for (let i = 0; i < annual.length; i++) {
          labels.push(`Year ${i}`);
        }
      } else {
        for (let i = 1; i <= annual.length; i++) {
          labels.push(`Year ${i}`);
        }
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
  }, [results, formType]);

  const downloadExcel = useCallback(() => {
    const elt = table.current;
    if (elt !== null) {
      const wb = utils.table_to_book(elt);
      writeFileXLSX(wb, "myInterestInvst.xlsx");
    } else {
      alert("Enter your data first!");
    }
  }, [table]);

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
            <div>
              {results && (
                <Button
                  className="submitButton downloadExcel"
                  onClick={downloadExcel}
                >
                  Download as Excel
                </Button>
              )}
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
                    <Table striped="columns" ref={table}>
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
                              <tr key={`${idx}--row`}>
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
                  {showChart && chartData !== null && (
                    <Line
                      className="lineChartContainer"
                      options={options}
                      data={chartData}
                    />
                  )}
                </>
              )}
              {results && formType === "present" && (
                <>
                  <div className="interestTable">
                    <Table striped="columns" ref={table}>
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
                              <tr key={`${idx}--row`}>
                                <td>Year {idx}</td>
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
                  {showChart && chartData !== null && (
                    <Line
                      className="lineChartContainer"
                      options={options}
                      data={chartData}
                    />
                  )}
                </>
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
