import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import AddIncomeModal from "./AddIncomeModal";
import AddExpenseModal from "./AddExpenseModal";
import AddInvestmentModal from "./AddInvestmentModal";
import { Pencil, Trash, PlusCircle } from "react-bootstrap-icons";

const UserTable = (props) => {
  const { type, data } = props;
  const [showAddModal, setShowAddModal] = useState(false);
  const [incomeAction, setIncomeAction] = useState(null);
  const [key, setKey] = useState(null);

  const add = () => {
    setShowAddModal(true);
    setIncomeAction("add");
  };

  // const deleteItem = async () => {
  //   if (type == "income") {
  //     const endpoint = "/api/income";
  //     const options = {
  //       method: "DELETE",
  //       body: JSON.stringify({
  //         oldName: incomeKey,
  //         localId: userInfo.localId,
  //         token: userInfo.idToken,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     const response = await fetch(endpoint, options);
  //     const result = await response.json();
  //     if (result.error) {
  //       console.log("error");
  //     }
  //   }
  // };
  const counter = 0;
  const totalAmount = 0;
  return (
    <>
      <div className="userTable">
        {type == "incomes" && (
          <Table striped="columns">
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
                  console.log(key);
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
                              deleteItem(key);
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
          </Table>
        )}
        {type == "investments" && (
          <Table striped="columns">
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Amount</th>
                <th>Bank</th>
                <th>Current/Maturity Price</th>
                <th>Gains</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                Object.entries(data).map(([key, val]) => {
                  counter++;
                  totalAmount += parseFloat(val.Amount);
                  console.log(key);
                  return (
                    <tr>
                      <td>Hello</td>
                      <td>Hello</td>
                      <td>Hello</td>
                      <td>Hello</td>
                      <td>Hello</td>
                      <td>Hello</td>
                      <td>Hello</td>
                      <td>Hello</td>
                      <td>Hello</td>
                    </tr>
                  );
                })}
              <tr>
                <td>Total</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </Table>
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
