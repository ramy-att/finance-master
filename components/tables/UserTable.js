import Table from "react-bootstrap/Table";
import { useState } from "react";
import AddIncomeModal from "./AddIncomeModal";
import AddExpenseModal from "./AddExpenseModal";
import AddInvestmentModal from "./AddInvestmentModal";
import { Pencil, Trash, PlusCircle, Eye } from "react-bootstrap-icons";
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

  const gicCounter = 0;
  const gicAmount = 0;
  const stocksCounter = 0;
  const stocks = { invested: 0, current: 0, dividents: 0 };
  const cryptoCounter = 0;
  const crypto = { invested: 0, current: 0 };
  const expCatCounter = 0;

  const sortIncomes = (array) => {
    const daily = [];
    const weekly = [];
    const biweekly = [];
    const monthly = [];
    const quarterly = [];
    const semiAnnaully = [];
    const annually = [];
    Object.entries(array).map(([key, val]) => {
      val.Freq == "Daily"
        ? daily.push({ name: key, ...val })
        : val.Freq == "Weekly"
        ? weekly.push({ name: key, ...val })
        : val.Freq == "Biweekly"
        ? biweekly.push({ name: key, ...val })
        : val.Freq == "Monthly"
        ? monthly.push({ name: key, ...val })
        : val.Freq == "Quarterly"
        ? quarterly.push({ name: key, ...val })
        : val.Freq == "Semi-Annually"
        ? semiAnnaully.push({ name: key, ...val })
        : annually.push({ name: key, ...val });
    });
    return [
      ...daily,
      ...weekly,
      ...biweekly,
      ...monthly,
      ...quarterly,
      ...semiAnnaully,
      ...annually,
    ];
  };
  type == "incomes" ? sortIncomes(data) : null;

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

  const incomeTable = () => {
    return (
      <>
        <thead>
          <tr>
            <th>#</th>
            <th>Frequency</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            Object.entries(sortIncomes(data)).map(([key, val]) => {
              counter++;
              totalAmount +=
                val.Freq == "Daily"
                  ? parseFloat(val.Amount) * 365
                  : val.Freq == "Weekly"
                  ? parseFloat(val.Amount) * 52
                  : val.Freq == "Biweekly"
                  ? parseFloat(val.Amount) * 26
                  : val.Freq == "Monthly"
                  ? parseFloat(val.Amount) * 12
                  : val.Freq == "Quarterly"
                  ? parseFloat(val.Amount) * 4
                  : val.Freq == "Semi-Annually"
                  ? parseFloat(val.Amount) * 2
                  : parseFloat(val.Amount);
              return (
                <tr key={`${key}--income-row`}>
                  <td>{counter}</td>
                  <td>{val.Freq}</td>
                  <td>{val.Category}</td>
                  <td>${val.Amount}</td>
                  <td>
                    <div className="actionsTd">
                      <Pencil
                        className="tableIcon"
                        onClick={() => {
                          setShowAddModal(true);
                          setIncomeAction("edit");
                          setKey(val.name);
                        }}
                        size={20}
                      />
                      <Trash
                        className="tableIcon"
                        onClick={() => {
                          deleteItem("income", val.name);
                        }}
                        size={20}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}

          {counter > 1 && (
            <tr>
              <td>Annual Total</td>
              <td></td>
              <td></td>
              <td>${totalAmount}</td>
              <td></td>
            </tr>
          )}
        </tbody>
      </>
    );
  };
  const gicTable = () => {
    //.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return (
      data &&
      Object.entries(data).map(([key, val]) => {
        if (val.type == "GIC/CD") {
          gicCounter++;
          gicAmount += parseFloat(val.amount);
          return (
            <tr key={`${key}--gic-row`}>
              <td>{gicCounter}</td>
              <td colSpan={2}>${val.amount}</td>
              <td>{val.interest * 100}%</td>
              <td>
                {val.duration} {val.duration > 1 ? "Years" : "Year"}
              </td>
              <td>{val.purchaseDate}</td>
              <td>{val.maturityDate}</td>
              <td>{val.bank}</td>
              <td>{val.payoutFreq}</td>
              <td>${val.interestAmount}</td>
              <td colSpan={2}>${val.maturedAmount}</td>
              {/* <td></td> */}
              <td colSpan={2}>
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
      })
    );
  };
  const stocksTable = () => {
    return (
      data &&
      Object.entries(data).map(([key, val]) => {
        if (val.type == "Stocks") {
          stocksCounter++;
          stocks.invested += parseFloat(val.stockPrice * val.numberStocks);
          stocks.current += parseFloat(
            val.currentStockPrice * val.numberStocks
          );
          stocks.dividents += parseFloat(val.divident * val.dividentFreq);
          return (
            <tr key={`${key}--stock-row`}>
              <td>{stocksCounter}</td>
              <td>{val.stockName}</td>
              <td>{val.numberStocks}</td>
              <td>${val.stockPrice}</td>
              <td>{val.purchaseDate}</td>
              <td>{val.bank}</td>
              <td>${val.currentStockPrice}</td>
              <td>${val.divident}</td>
              <td>${parseFloat(val.stockPrice * val.numberStocks)}</td>
              <td>${parseFloat(val.currentStockPrice * val.numberStocks)}</td>
              <td>{val.dividentFreq}/Year</td>
              <td>
                $
                {parseFloat(val.currentStockPrice) - parseFloat(val.stockPrice)}
              </td>
              <td>
                $
                {parseFloat(val.currentStockPrice * val.numberStocks) -
                  parseFloat(val.stockPrice * val.numberStocks)}
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
      })
    );
  };
  const cryptoTable = () => {
    return (
      data &&
      Object.entries(data).map(([key, val]) => {
        if (val.type == "Crypto") {
          cryptoCounter++;
          crypto.invested += parseFloat(val.coinPrice * val.numberCoins);
          crypto.current += parseFloat(val.currentPrice * val.numberCoins);
          return (
            <tr key={`${key}--crypto-row`}>
              <td>{cryptoCounter}</td>
              <td colSpan={2}>{val.coinName}</td>
              <td>{val.numberCoins}</td>
              <td>${val.coinPrice}</td>
              <td></td>
              <td>${val.currentPrice}</td>
              <td>${val.coinPrice * val.numberCoins}</td>
              <td>${val.currentPrice * val.numberCoins}</td>
              <td>{val.bank}</td>
              <td>
                ${parseFloat(val.currentPrice) - parseFloat(val.coinPrice)}
              </td>
              <td>
                $
                {parseFloat(val.currentPrice * val.numberCoins) -
                  parseFloat(val.coinPrice * val.numberCoins)}
              </td>
              <td colSpan={2}>
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
      })
    );
  };
  const investmentTable = () => {
    return (
      <tbody>
        <tr>
          <th>GICs/CDs</th>
        </tr>
        <tr>
          <th>#</th>
          <th colSpan={2}>Amount</th>
          <th>Interest</th>
          <th>Duration</th>
          <th>Purchase Date</th>
          <th>End Date</th>
          <th>Bank</th>
          <th>Payout Freq</th>
          <th>Interest Amount</th>
          <th colSpan={2}>Matured Amount</th>
          <th>Actions</th>
        </tr>
        {gicTable()}
        {gicCounter > 1 && (
          <tr>
            <td>Locked Total</td>
            <td colSpan={13}>${gicAmount}</td>
          </tr>
        )}
        <tr>
          <th>Stocks/ETFs</th>
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
          <th>Purchased Total</th>
          <th>Current Total</th>
          <th>Divident Freq</th>
          <th>Gain/Loss Per Unit</th>
          <th>Gain/Loss</th>
          <th>Actions</th>
        </tr>
        {stocksTable()}
        {stocksCounter > 1 && (
          <tr>
            <td>Total</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>${stocks.invested}</td>
            <td>${stocks.current}</td>
            <td>${stocks.dividents} (annual)</td>
            <td></td>
            <td>${stocks.current - stocks.invested}</td>
            <td></td>
          </tr>
        )}
        <tr>
          <th colSpan={9}>Crypto</th>
        </tr>
        <tr>
          <th>#</th>
          <th colSpan={2}>Name</th>
          <th>Qty</th>
          <th>Purchase Price / Coin</th>
          <th>Purchase Date</th>
          <th>Current Price/ Coin</th>
          <th>Total Purchase Price</th>
          <th>Total Current Price</th>
          <th>Bank</th>
          <th>Gain/Loss Per Unit</th>
          <th>Gain/Loss</th>
          <th colSpan={2}>Actions</th>
        </tr>
        {cryptoTable()}
        {cryptoCounter > 1 && (
          <tr>
            <td>Total</td>
            <td colSpan={2}></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>${crypto.invested}</td>
            <td>${crypto.current}</td>
            <td></td>
            <td></td>
            <td>${crypto.current - crypto.invested}</td>
            <td colSpan={2}></td>
          </tr>
        )}
      </tbody>
    );
  };
  const expensesBody = () => {
    let totalExpenses = 0;
    return (
      <>
        {data &&
          Object.entries(data).map(([key, val]) => {
            expCatCounter++;
            totalExpenses += parseFloat(val.CategoryAmount);
            console.log(val)
            return (
              <tr key={`${key}--expense-row`}>
                <td>{expCatCounter}</td>
                <td>{val.CategoryTitle}</td>
                <td>${val.CategoryAmount}</td>
                <td>
                  <div className="actionsTd">
                    <Eye size={20} />
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
                        deleteItem("expense", key);
                      }}
                      size={20}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        {Object.keys(data).length > 0 && (
          <tr>
            <td>Total</td>
            <td></td>
            <td>${totalExpenses}</td>
            <td></td>
          </tr>
        )}
      </>
    );
  };
  const expensesTable = () => {
    return (
      <tbody>
        <tr>
          <th>#</th>
          <th>Category</th>
          <th>Annual Total</th>
          <th>Actions</th>
        </tr>
        {expensesBody()}
      </tbody>
    );
  };
  const counter = 0;
  const totalAmount = 0;
  return (
    <>
      <div className="userTable">
        {type == "incomes" ? (
          Object.keys(data).length > 0 ? (
            <Table striped="columns">{incomeTable()}</Table>
          ) : (
            <h1>Add Your First Income!</h1>
          )
        ) : type == "investments" ? (
          Object.keys(data).length > 0 ? (
            <Table striped="columns" className="investmentTable">
              {investmentTable()}
            </Table>
          ) : (
            <h1>Add Your First Investment!</h1>
          )
        ) : (
          type == "expenses" && (
            <Table striped="columns">{expensesTable()}</Table>
          )
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
      {showAddModal && type == "investments" && (
        <AddInvestmentModal
          typeOfAction={incomeAction}
          investKey={key}
          show={showAddModal}
          type={type}
          onHide={() => setShowAddModal(false)}
        />
      )}
      {showAddModal && type == "expenses" && (
        <AddExpenseModal
          typeOfAction={incomeAction}
          expenseKey={key}
          show={showAddModal}
          type={type}
          onHide={() => setShowAddModal(false)}
        />
      )}
    </>
  );
};
export default UserTable;
