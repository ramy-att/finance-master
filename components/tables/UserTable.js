import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import AddIncomeModal from "./AddIncomeModal";
import AddExpenseModal from "./AddExpenseModal";
import AddInvestmentModal from "./AddInvestmentModal";
import { Pencil, Trash, PlusCircle } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../store";

const UserTable = (props) => {
  const { type, data } = props;
  const [showAddModal, setShowAddModal] = useState(false);
  const [incomeAction, setIncomeAction] = useState(null);
  const [key, setKey] = useState(null);

  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  const add = () => {
    setShowAddModal(true);
    setIncomeAction("add");
  };

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
      console.log(result)
      if (!result.error) {
        dispatch(authActions.deleteIncome(result.deletedName));
      }
    } else if (type == "investment") {
      const endpoint = "/api/investment";
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
        dispatch(authActions.deleteInvestment(result.deletedName));
      }
    }
  };
  const incomeTable = () => {
    return (
      <>
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            Object.entries(data).map(([key, val]) => {
              counter++;
              totalAmount += parseFloat(val.Amount);
              return (
                <tr>
                  <td>{counter}</td>
                  <td>{val.Category}</td>
                  <td>${val.Amount}</td>
                  <td>
                    <div className="actionsTd">
                      <Pencil
                        className="tableIcon"
                        onClick={() => {
                          setShowAddModal(true);
                          setIncomeAction("edit");
                          setKey(key);
                        }}
                        size={20}
                      />
                      <Trash
                        className="tableIcon"
                        onClick={() => {
                          deleteItem("income", key);
                        }}
                        size={20}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          <tr>
            <td>Total</td>
            <td>Total</td>
            <td>${totalAmount}</td>
            <td></td>
          </tr>
        </tbody>
      </>
    );
  };
  const investmentTable = () => {
    const gicCounter = 0;
    return (
      <>
        <tbody>
          <tr>
            <th colSpan={9}>GICs/CDs</th>
          </tr>
          <tr>
            <th>#</th>
            <th>Amount</th>
            <th>Interest</th>
            <th>Duration</th>
            <th>Purchase Date</th>
            <th>Bank</th>
            <th>Payout Freq</th>
            <th>Interest Amount</th>
            <th>Matured Amount</th>
            <th>Actions</th>
          </tr>
          {data &&
            Object.entries(data).map(([key, val]) => {
              if (val.type == "GIC/CD") {
                gicCounter++;
                totalAmount += parseFloat(val.amount);
                return (
                  <tr>
                    <td>{gicCounter}</td>
                    <td>
                      $
                      {val.amount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td>{val.interest * 100}%</td>
                    <td>{val.duration} Year(s)</td>
                    <td>{val.purchaseDate}</td>
                    <td>{val.bank}</td>
                    <td>{val.payoutFreq}</td>
                    <td>
                      $
                      {val.interestAmount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td>
                      $
                      {val.maturedAmount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td>
                      <div className="actionsTd">
                        <Pencil
                          className="tableIcon"
                          onClick={() => {
                            setShowAddModal(true);
                            setIncomeAction("edit");
                            setKey(key);
                          }}
                          size={20}
                        />
                        <Trash
                          className="tableIcon"
                          onClick={() => {
                            deleteItem("investment", key);
                          }}
                          size={20}
                        />
                      </div>
                    </td>
                  </tr>
                );
              }
            })}
          <tr>
            <th colSpan={9}>Stocks/ETFs</th>
          </tr>
          <tr>
            <th>#</th>
            <th>Symbol</th>
            <th>Qty</th>
            <th>Purchase Price / Unit</th>
            <th>Purchase Date</th>
            <th>Bank</th>
            <th>Current Price</th>
            <th>Divident</th>
            <th>Gain/Loss</th>
          </tr>
          <tr>
            <th colSpan={9}>Crypto</th>
          </tr>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Purchase Price / Unit</th>
            <th>Purchase Date</th>
            <th>Bank</th>
            <th>Current Price</th>
            <th>Gain/Loss</th>
          </tr>
        </tbody>
      </>
    );
  };
  const counter = 0;
  const totalAmount = 0;
  return (
    <>
      <div className="userTable">
        {type == "incomes" && <Table striped="columns">{incomeTable()}</Table>}
        {type == "investments" && (
          <Table striped="columns">{investmentTable()}</Table>
        )}
      </div>
      <div className="tableAddMoreButton">
        <PlusCircle className="tableIcon plusCircle" onClick={add} size={30} />
      </div>
      {showAddModal && type == "incomes" && (
        <AddIncomeModal
          typeOfAction={incomeAction}
          incomeKey={key}
          show={showAddModal}
          type={type}
          onHide={() => setShowAddModal(false)}
        />
      )}
      {showAddModal && type == "expenses" && (
        <AddExpenseModal
          show={showAddModal}
          type={type}
          onHide={() => setShowAddModal(false)}
        />
      )}
      {showAddModal && type == "investments" && (
        <AddInvestmentModal
          // typeOfAction={incomeAction}
          // incomeKey={key}
          show={showAddModal}
          type={type}
          onHide={() => setShowAddModal(false)}
        />
      )}
    </>
  );
};
export default UserTable;
