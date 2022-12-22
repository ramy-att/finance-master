import Block from "./Block";
import { Col, Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import AddIncomeModal from "../tables/AddIncomeModal";

export const Budget = (props) => {
  const expenses = useSelector((state) => state.userExpenses);
  const incomes = useSelector((state) => state.userIncomes);
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [incomeAction, setIncomeAction] = useState("add");

  const editIncome = () => {
    alert("hl");
    setShowAddIncomeModal(true);
    setIncomeAction("edit");
  };
  return (
    <Container class="budgetContainer">
      <h1 className="budgetRowTitle">Incomes</h1>
      <div class="budgetRow">
        {Object.entries(incomes).map(([key, val]) => {
          return (
            // <Col lg={12}>
            <Block title={val.Category} type="income" elements={val} />
            // </Col>
          );
        })}
        <Block
          onClick={() => {
            setShowAddIncomeModal(true);
          }}
          editElm={editIncome}
          state="addMore"
          type="income"
        />
      </div>
      <h1 className="budgetRowTitle">Expenses</h1>
      <div class="budgetRow">
        {Object.entries(expenses).map(([key, val]) => {
          return <Block title={val.title} type="expense" elements={val} />;
        })}
        <Block state="addMore" type="income" />
      </div>
      <AddIncomeModal
        typeOfAction={incomeAction}
        // incomeKey={key}
        show={showAddIncomeModal}
        // type={type}
        onHide={() => setShowAddIncomeModal(false)}
      />
      {/* Add a bar chart showing In vs Out */}
    </Container>
  );
};
