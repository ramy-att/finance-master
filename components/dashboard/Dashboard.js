import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import useGetAnnual from "../hooks/useGetAnnual";
import UserTable from "../tables/UserTable";
import Summary from "./Summary";
const Dashboard = () => {
  const expenses = useSelector((state) => state.userExpenses);
  const incomes = useSelector((state) => state.userIncomes);
  const investments = useSelector((state) => state.userInvestments);
  const cash = useSelector((state) => state.userCash);
  const loans = useSelector((state) => state.userLoans);

  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalInvestments, setTotalInvestments] = useState({
    gicPurchase: 0,
    gicMaturity: 0,
    stocksPurchase: 0,
    stocksCurrent: 0,
    cryptoPurchase: 0,
    cryptoCurrent: 0,
  });
  const [totalAssets, setTotalAssets] = useState(0);
  const [totalLoans, setTotalLoans] = useState(0);

  useEffect(() => {
    const invests = {
      gicPurchase: 0,
      gicMaturity: 0,
      stocksPurchase: 0,
      stocksCurrent: 0,
      cryptoPurchase: 0,
      cryptoCurrent: 0,
    };
    let totalAssets = 0;
    Object.entries(incomes).map(([key, val]) => {
      setTotalIncomes(
        parseFloat(totalIncomes) + useGetAnnual(val.Freq, val.Amount)
      );
    });
    Object.entries(expenses).map(([key, val]) => {
      val.CategoryAmount != 0
        ? setTotalExpenses(
            parseFloat(totalExpenses) + parseFloat(val.CategoryAmount)
          )
        : null;
    });
    Object.entries(investments).map(([key, val]) => {
      if (val.type == "GIC/CD") {
        invests.gicMaturity =
          parseFloat(invests.gicMaturity) + parseFloat(val.maturedAmount);
        invests.gicPurchase =
          parseFloat(invests.gicPurchase) + parseFloat(val.amount);
      } else if (val.type == "Stocks") {
        invests.stocksPurchase =
          parseFloat(invests.stocksPurchase) +
          parseFloat(val.stockPrice) * parseFloat(val.numberStocks);
        invests.stocksCurrent =
          parseFloat(invests.stocksCurrent) +
          parseFloat(val.currentStockPrice) * parseFloat(val.numberStocks);
      } else {
        invests.cryptoPurchase =
          parseFloat(invests.cryptoPurchase) +
          parseFloat(val.coinPrice) * parseFloat(val.numberCoins);
        invests.cryptoCurrent =
          parseFloat(invests.cryptoCurrent) +
          parseFloat(val.currentPrice) * parseFloat(val.numberCoins);
      }
      setTotalInvestments(invests);
    });
    Object.entries(cash).map(([key, val]) => {
      totalAssets += parseFloat(val.Amount);
    });
    setTotalAssets(totalAssets);
    Object.entries(loans).map(([key, val]) => {
      setTotalLoans(parseFloat(totalLoans) - parseFloat(val.totalPaid));
    });
  }, [incomes, expenses, investments, cash]);

  const investmentsDiff =
    totalInvestments.cryptoCurrent +
    totalInvestments.gicMaturity +
    totalInvestments.stocksCurrent -
    (totalInvestments.cryptoPurchase +
      totalInvestments.stocksPurchase +
      totalInvestments.gicPurchase);
  return (
    <div className="dashboardPage">
      <Container fluid>
        <h1 className="dashboardTitle">Your Dashboard</h1>
        <Row className="text-center">
          <Col lg={6} xl={4}>
            <Summary
              title="Annual Budget"
              data={[
                { title: "In", amount: `$${totalIncomes}` },
                { title: "Out", amount: `$${totalExpenses}` },
                {
                  title: "Difference",
                  amount: `$${totalIncomes - totalExpenses}`,
                },
              ]}
            />
          </Col>
          <Col lg={6} xl={4}>
            <Summary
              title="Investments"
              data={[
                {
                  title: "GICs (Purchase / Maturity)",
                  amount: `$${totalInvestments.gicPurchase} / $${totalInvestments.gicMaturity}`,
                },
                {
                  title: "Market (Purchase / Current)",
                  amount: `$${totalInvestments.stocksPurchase} / $${totalInvestments.stocksCurrent}`,
                },
                {
                  title: "Crypto (Purchase / Current)",
                  amount: `$${totalInvestments.cryptoPurchase} / $${totalInvestments.cryptoCurrent}`,
                },
                {
                  title: "Total (Difference)",
                  amount: `$${
                    totalInvestments.cryptoPurchase +
                    totalInvestments.stocksPurchase +
                    totalInvestments.gicPurchase
                  } / $${
                    totalInvestments.cryptoCurrent +
                    totalInvestments.gicMaturity +
                    totalInvestments.stocksCurrent
                  } ($${investmentsDiff})`,
                },
              ]}
            />
          </Col>
          <Col lg={6} xl={4}>
            <Summary
              title="Net Worth"
              data={[
                { title: "Assets", amount: `$${totalAssets}` },
                {
                  title: "Investments Value (matured, current)",
                  amount: `$${
                    totalInvestments.cryptoCurrent +
                    totalInvestments.stocksCurrent +
                    totalInvestments.gicMaturity
                  }`,
                },
                { title: "Loans", amount: `$${totalLoans}` },
                {
                  title: "Net Worth",
                  amount: `$${totalLoans + investmentsDiff + totalAssets}`,
                },
              ]}
            />
          </Col>
        </Row>
        <Row>
          <h2 className="dashboardTitles">Incomes</h2>
          <UserTable type="income" data={incomes} />
        </Row>
        <Row>
          <h2 className="dashboardTitles">Investments</h2>
          <UserTable type="investment" data={investments} />
        </Row>
        <Row>
          <h2 className="dashboardTitles">Expenses</h2>
          <UserTable type="expense" data={expenses} />
        </Row>
        <Row>
          <h2 className="dashboardTitles">Cash & Assets</h2>
          <UserTable type="cash" data={cash} />
        </Row>
        <Row>
          <h2 className="dashboardTitles">Loans</h2>
          <UserTable type="loan" data={loans} />
        </Row>
      </Container>
    </div>
  );
};
export default Dashboard;
