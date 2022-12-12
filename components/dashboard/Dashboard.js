import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import UserTable from "../tables/UserTable";
import { useSelector } from "react-redux";
import Summary from "./Summary";
import { useEffect, useState, useCallback } from "react";
const Dashboard = () => {
  const expenses = useSelector((state) => state.userExpenses);
  const incomes = useSelector((state) => state.userIncomes);
  const investments = useSelector((state) => state.userInvestments);

  const [totalIncomes, setTotalIncomes] = useState(0);
  // console.log(investments);
  // const callAPI = async ()=>{
  //   // get: const key= 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=SPX:INDEX&apikey=ROAPGSXI5YJ08S6W'
  //   // search: const key= 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=INDEX&apikey=ROAPGSXI5YJ08S6W'
  //   const response = await fetch(key, {
  //     method: "GET",
  //     header: {
  //       "Content/type": "application/json",
  //     },
  //   });
  //   const result = await response.json();
  //   console.log(result);
  // }
  // useEffect(()=>{
  //   callAPI();
  // },[])

  return (
    <div className="dashboardPage">
      <Container fluid>
        <h1 className="dashboardTitle">Your Dashboard</h1>
        <Row className="text-center">
          <Col sm={4}>
            <Summary
              title="Monthly Budget"
              data={[
                { title: "In", amount: totalIncomes },
                { title: "Out", amount: "1000" },
              ]}
            />
          </Col>
          <Col sm={4}>
            <Summary
              title="Investments"
              data={[
                { title: "GICs", amount: "1000" },
                { title: "Stocks/ETFs", amount: "1000" },
                { title: "Other", amount: "1000" },
              ]}
            />
          </Col>
          <Col sm={4}>
            <Summary
              title="Net Worth"
              data={[
                { title: "Account", amount: "1000" },
                { title: "Investments", amount: "1000" },
                { title: "Loans", amount: "1000" },
              ]}
            />
          </Col>
        </Row>
        <Row>
          <h2 className="dashboardTitles">Monthly Incomes</h2>
          <UserTable
            type="incomes"
            data={incomes}
          />
        </Row>
        <Row>
          <h2 className="dashboardTitles">Investments</h2>
          <UserTable
            type="investments"
            data={investments}
          />
        </Row>
      </Container>
    </div>
  );
};
export default Dashboard;
