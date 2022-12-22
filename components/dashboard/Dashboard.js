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
  console.log(incomes)
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
          <h2 className="dashboardTitles">Incomes</h2>
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
          <p>*BETA Version Of This App Does Not Allow Live Tracking Of Stock Market*</p>
        </Row>
        <Row>
          <h2 className="dashboardTitles">Expenses</h2>
          <UserTable
            type="expenses"
            data={expenses}
          />
          <p>*Breakdown of Expenses in MyBudget*</p>
        </Row>
      </Container>
    </div>
  );
};
export default Dashboard;
