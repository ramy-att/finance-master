import Link from "next/link";
import { BoxArrowUpRight, Pencil, PlusLg, Trash } from "react-bootstrap-icons";
import { formatNumber } from "../utills/utils";

const Block = (props) => {
  const { state, type, title, onClick, editElm, idx, deleteElm, elements } =
    props;
  return (
    <div
      className={`${state == "addMore" && "addMoreIcon"} ${
        type == "loans" && "loanBlock"
      } ${state == "addMore" && type == "loans" ? "loanAddMore" : null} block`}
      onClick={state == "addMore" && onClick ? onClick : null}
    >
      {state == "addMore" ? (
        <PlusLg size={100} />
      ) : (
        <>
          <h2 className="expenseBlockTitle">{title && title}</h2>
          {type == "expense" ? (
            <div className="expensesTableContainer">
              <table className="expenseTable">
                <tbody>
                  {elements.map((expense, idx) => {
                    return (
                      <tr
                        className="expenseTableRow"
                        key={`${idx}--expense-row`}
                      >
                        <td className="expenseIdx">{idx}</td>
                        <td className="expenseTitleCell">
                          {expense.ExpenseTitle}
                        </td>
                        <td>${formatNumber(expense.ExpenseAmount)}</td>
                        <td>{expense.ExpenseFreq}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : type == "income" ? (
            <div className="incomesContainer">
              <h3 className="incomeLine">
                <div>${formatNumber(elements.Amount)}</div>
                <div>{elements.Freq}</div>
              </h3>
            </div>
          ) : type == "investment" ? (
            <>
              <h2>
                {elements.type} #{idx + 1}
              </h2>
              <div className="expensesContainer">
                {Object.entries(elements).map(([key, val]) => {
                  if (
                    !(
                      key == "name" ||
                      key == "type" ||
                      key == "bank" ||
                      val == ""
                    )
                  ) {
                    return (
                      <div className="incomeLine" key={`${key}--investment`}>
                        <span className="expenseItemCont">{key}</span>
                        {/* Add Freq Here */}
                        <span className="expenseItemCont">
                          {key == "coinPrice" ||
                          key == "currentPrice" ||
                          key == "interestAmount" ||
                          key == "amount" ||
                          key == "stockPrice" ||
                          key == "currentStockPrice" ||
                          key == "divident" ||
                          key == "totalCurrent" ||
                          key == "totalPurchase" ||
                          key == "maturedAmount"
                            ? `$${formatNumber(val)}`
                            : key == "duration"
                            ? `${val} years`
                            : key == "interest"
                            ? `${val * 100}%`
                            : key == "dividentFreq"
                            ? `${val}/year`
                            : val}
                        </span>
                      </div>
                    );
                  }
                })}
              </div>
            </>
          ) : type == "assets" ? (
            <>
              <div className="expensesContainer">
                {Object.entries(elements).map(([key, val]) => {
                  if (
                    !(
                      key == "name" ||
                      val == "" ||
                      key == "AccountName" ||
                      key == "returnSecureToken"
                    )
                  ) {
                    return (
                      <div className="incomeLine" key={`${key}--investment`}>
                        <span className="expenseItemCont">{key}</span>
                        <span className="expenseItemCont">
                          {key == "Amount" ? `$${formatNumber(val)}` : val}
                        </span>
                      </div>
                    );
                  }
                })}
              </div>
            </>
          ) : type == "bankAcc" ? (
            <>
              <div className="expensesContainer">
                {Object.entries(elements).map(([key, val]) => {
                  if (
                    !(
                      key == "name" ||
                      val == "" ||
                      key == "AccountName" ||
                      key == "returnSecureToken"
                    )
                  ) {
                    return (
                      <div className="incomeLine" key={`${key}--investment`}>
                        <span className="expenseItemCont">{key}</span>
                        {/* Add Freq Here */}
                        <span className="expenseItemCont">
                          {key == "Amount" ? `$${formatNumber(val)}` : val}
                        </span>
                      </div>
                    );
                  }
                })}
              </div>
            </>
          ) : type == "otherAsset" ? (
            <>
              <div className="expensesContainer">
                {Object.entries(elements).map(([key, val]) => {
                  if (
                    !(
                      key == "name" ||
                      val == "" ||
                      key == "AccountName" ||
                      key == "returnSecureToken"
                    )
                  ) {
                    return (
                      <div className="incomeLine" key={`${key}--investment`}>
                        <span className="expenseItemCont">{key}</span>
                        {/* Add Freq Here */}
                        <span className="expenseItemCont">
                          {key == "Amount" ? `$${formatNumber(val)}` : val}
                        </span>
                      </div>
                    );
                  }
                })}
              </div>
            </>
          ) : (
            <>
              <div className="expensesContainer">
                <div className="loanContainer">
                  <div className="loanItemCont">
                    <div className="loanItem">
                      <span>Initital Owed:</span>$
                      {formatNumber(parseFloat(elements.initialOwed) +
                        parseFloat(elements.downPayment))}
                    </div>
                    <div className="loanItem">
                      <span>Down Payment: </span>${formatNumber(elements.downPayment)}
                    </div>
                    <div className="loanItem">
                      <span>Loaned Amount:</span>$
                      {formatNumber(parseFloat(elements.initialOwed))}
                    </div>
                    <div className="loanItem">
                      <span>Payment Freq:</span>
                      {elements.frequency}
                    </div>
                  </div>
                  <div className="loanItemCont">
                    <div className="loanItem">
                      <span>No. Payments:</span>
                      {elements.payments.length}
                    </div>
                    <div className="loanItem">
                      <span>Total Interest:</span>${formatNumber(elements.totalInterest)} (
                      {elements.interestRate * 100}%)
                    </div>
                    <div className="loanItem">
                      <span>Total Paid:</span>${formatNumber(elements.totalPaid)}
                    </div>
                    <div className="loanItem">
                      <span>Payment Amount:</span>$
                      {formatNumber(elements.payments[0].payment)}
                    </div>
                  </div>
                </div>
                <div className="blockLinkCont">
                  <Link href={`/myLoans/${idx !== undefined ? idx : ""}`}>
                    <a target={"_blank"}>
                      See Payment Schedule
                      <BoxArrowUpRight
                        style={{ marginBottom: "5px", marginLeft: "5px" }}
                      />
                    </a>
                  </Link>
                </div>
              </div>
            </>
          )}
          <div className="blockIconsCont">
            <div className="blockIcons">
              <Pencil className="blockIcon" size={30} onClick={editElm} />
              <Trash className="blockIcon" size={30} onClick={deleteElm} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Block;
