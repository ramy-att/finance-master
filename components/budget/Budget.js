import Block from "../Block/Block";
import { Col, Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { ChartSection } from "./ChartSection";
import AddIncomeModal from "../tables/AddIncomeModal";
import AddExpenseModal from "../tables/AddExpenseModal";
import { useDispatch } from "react-redux";
import { authActions } from "../store";

export const Budget = (props) => {
  const expenses = useSelector((state) => state.userExpenses);
  const incomes = useSelector((state) => state.userIncomes);
  const userInfo = useSelector((state) => state.userInfo);

  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [key, setKey] = useState("");
  const [incomeAction, setIncomeAction] = useState("");
  const [expenseAction, setExpenseAction] = useState("");

  const dispatch = useDispatch();

  const deleteItem = async (type, key) => {
    if (type == "income") {
      const endpoint = "/api/income";
      const options = {
        method: "DELETE",
        body: JSON.stringify({
          localId: userInfo.localId,
          token: userInfo.idToken,
          name: key,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(endpoint, options);
      const result = await response.json();
      if (!result.error) {
        dispatch(authActions.deleteIncome(result.deletedName));
      }
    } else {
      const endpoint = "/api/expense";
      const options = {
        method: "DELETE",
        body: JSON.stringify({
          localId: userInfo.localId,
          token: userInfo.idToken,
          name: key,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(endpoint, options);
      const result = await response.json();
      if (!result.error) {
        dispatch(authActions.deleteExpense(result.deletedName));
      }
    }
  };
  const hideModals = () => {
    setShowAddExpenseModal(false);
    setShowAddIncomeModal(false);
    // setKey('');
    setExpenseAction("");
    setIncomeAction("");
  };
  return (
    <Container class="budgetContainer">
      <h1 className="budgetRowTitle">Incomes</h1>
      <div class="budgetRow">
        {Object.entries(incomes).map(([key, val]) => {
          return (
            <Block
              key={`${key}--incomeBlock`}
              title={val.Category}
              type="income"
              editElm={() => {
                setShowAddIncomeModal(true);
                setIncomeAction("edit");
                setKey(key);
              }}
              deleteElm={() => {
                deleteItem("income", key);
              }}
              elements={val}
            />
          );
        })}
        <Block
          onClick={() => {
            setShowAddIncomeModal(true);
          }}
          state="addMore"
          type="income"
        />
      </div>
      <h1 className="budgetRowTitle">Expenses</h1>
      <div class="budgetRow">
        {Object.entries(expenses).map(([key, val]) => {
          return (
            <Block
              key={`${key}--expenseBlock`}
              title={val.CategoryTitle}
              type="expense"
              editElm={() => {
                setShowAddExpenseModal(true);
                setExpenseAction("edit");
                setKey(key);
              }}
              deleteElm={() => {
                deleteItem("expense", key);
              }}
              elements={val.CategoryExpenses}
            />
          );
        })}
        <Block
          state="addMore"
          type="expense"
          onClick={() => {
            setShowAddExpenseModal(true);
          }}
        />
      </div>
      {showAddIncomeModal && (
        <AddIncomeModal
          typeofaction={incomeAction}
          incomekey={key}
          show={showAddIncomeModal}
          type={incomeAction}
          hideModal={hideModals}
          onHide={hideModals}
        />
      )}
      {showAddExpenseModal && (
        <AddExpenseModal
          typeofaction={expenseAction}
          expensekey={key}
          show={showAddExpenseModal}
          type={expenseAction}
          hideModal={hideModals}
          onHide={hideModals}
        />
      )}
      {/* Add a bar chart showing In vs Out */}
      <ChartSection incomes={incomes} expenses={expenses} />
    </Container>
  );
};
