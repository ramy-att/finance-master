import Table from "react-bootstrap/Table";
import { useState } from "react";
import AddIncomeModal from "./AddIncomeModal";
import AddExpenseModal from "./AddExpenseModal";
import AddInvestmentModal from "./AddInvestmentModal";
import {
  Pencil,
  Trash,
  PlusCircle,
  NodeMinusFill,
} from "react-bootstrap-icons";
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
        ? daily.push(val)
        : val.Freq == "Weekly"
        ? weekly.push(val)
        : val.Freq == "Biweekly"
        ? biweekly.push(val)
        : val.Freq == "Monthly"
        ? monthly.push(val)
        : val.Freq == "Quarterly"
        ? quarterly.push(val)
        : val.Freq == "Semi-Annually"
        ? semiAnnaully.push(val)
        : annually.push(val);
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
                <tr>
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
          <tr>
            <td>Annual Total</td>
            <td></td>
            <td></td>
            <td>${totalAmount}</td>
            <td></td>
          </tr>
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
            <tr>
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
            <tr>
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
            <tr>
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
        <tr>
          <td>Locked Total</td>
          <td colSpan={13}>${gicAmount}</td>
        </tr>
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
      </tbody>
    );
  };
  const counter = 0;
  const totalAmount = 0;
  return (
    <>
      <div className="userTable">
        {type == "incomes" && <Table striped="columns">{incomeTable()}</Table>}
        {type == "investments" && (
          <Table striped="columns" className="investmentTable">
            {investmentTable()}
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
          show={showAddModal}
          type={type}
          onHide={() => setShowAddModal(false)}
        />
      )}
    </>
  );
};
export default UserTable;
