import { useState } from "react";
import { PlusLg, Trash, Pencil } from "react-bootstrap-icons";

const Block = (props) => {
  const { state, type, title, onClick, editElm, idx, deleteElm, elements } =
    props;

  //   const daily = [];
  //   const weekly = [];
  //   const biweekly = [];
  //   const monthly = [];
  //   const quarterly = [];
  //   const semiAnnaully = [];
  //   const annually = [];
  //   Object.entries(elements).map(([key, val]) => {
  //     val.Freq == "Daily"
  //       ? daily.push(val)
  //       : val.Freq == "Weekly"
  //       ? weekly.push(val)
  //       : val.Freq == "Biweekly"
  //       ? biweekly.push(val)
  //       : val.Freq == "Monthly"
  //       ? monthly.push(val)
  //       : val.Freq == "Quarterly"
  //       ? quarterly.push(val)
  //       : val.Freq == "Semi-Annually"
  //       ? semiAnnaully.push(val)
  //       : annually.push(val);
  //   });
  //   return [
  //     ...daily,
  //     ...weekly,
  //     ...biweekly,
  //     ...monthly,
  //     ...quarterly,
  //     ...semiAnnaully,
  //     ...annually,
  //   ];
  // })
  // Maybe repalce spans with form inputs that have a default value can be edited - confirm on confirm
  return (
    <div
      className={`${state == "addMore" && "addMoreIcon"} block`}
      onClick={state == "addMore" && onClick ? onClick : null}
    >
      {state == "addMore" ? (
        <PlusLg size={100} />
      ) : (
        <>
          <h2>{title && title}</h2>
          {type == "expense" ? (
            <div className="expensesTableContainer">
              <table className="expenseTable">
                <tbody>
                  {elements.map((expense, idx) => {
                    return (
                      <tr className="expenseTableRow">
                        <td className="expenseIdx">{idx}</td>
                        <td className="expenseTitleCell">{expense.ExpenseTitle}</td>
                        <td>${expense.ExpenseAmount}</td>
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
                <div>${elements.Amount}</div>
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
                  if (!(key == "name" || key == "type" || key == "bank")) {
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
                          key == "maturedAmount"
                            ? `$${val}`
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
          ) : null}
          <div className="blockIconsCont">
            <div className="blockIcons">
              <Pencil className="blockIcon" size={30} onClick={editElm} />
              <Trash
                className="blockIcon"
                size={30}
                onClick={deleteElm && deleteElm}
              />
            </div>
          </div>
          {/* <Button className="blockButton">Confirm</Button> */}
        </>
      )}
    </div>
  );
};
export default Block;
