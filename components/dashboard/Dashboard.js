import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import UserTable from "../tables/UserTable";
import { useSelector } from "react-redux";
import Summary from "./Summary";
import { useEffect } from "react";
const Dashboard = () => {
  const expenses = useSelector((state) => state.userExpenses);
  const incomes = useSelector((state) => state.userIncomes);

  useEffect(() => {
    if (expenses) {
      for (const category in expenses) {
        console.log(expenses[category])
        console.log(`category title: ${expenses[category].title}`);
      }
    }
  }, [expenses]);

  return (
    <div>
      <Container fluid>
        <Row>
          <h1>Your Dashbaord</h1>
        </Row>
        <Row className="text-center">
          <Col sm={4}>
            <Summary
              title="Monthly Budget"
              data={[
                { title: "In", amount: "1000" },
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
        <Row clasName="dashboardRow">
          <h2>Monthly Incomes</h2>
          <UserTable
            type="incomes"
            data={[
              { Category: "Job", Amount: 5000 },
              { Category: "GIC", Amount: 100 },
              { Category: "Dividents", Amount: 120 },
            ]}
          />
        </Row>
        <Row>
          <h2>Monthly Expenses</h2>
          <UserTable
            type="expenses"
            data={[{ Category: "Home", Amount: 5000 }]}
          />
        </Row>
        {/* Some balance in here somehow */}
        <Row>
          <h2>Investments</h2>
          <UserTable type="investments" />
        </Row>
        <Row>
          <h2>Loans</h2>
          <UserTable type="loans" data={[{ Category: "Home", Amount: 5000 }]} />
        </Row>
        <Row>
          <h2>Account Balances</h2>
          <UserTable
            type="accounts"
            data={[{ Category: "Home", Amount: 5000 }]}
          />
        </Row>
      </Container>
    </div>
  );
};
export default Dashboard;
