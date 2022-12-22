import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { PlusLg, Trash, Pencil } from "react-bootstrap-icons";

const Block = (props) => {
  const { state, type, title, onClick, editElm, deleteElm, elements } = props;
  const [data, setData] = useState([]);
  console.log(editElm)
  // useEffect(()=>{
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
          <h2>{title}</h2>
          {type == "expense" ? (
            <div className="expensesContainer">
              {Object.entries(elements).map(([key, val]) => {
                return (
                  <div className="incomeLine">
                    <span className="expenseItemCont">{val.expenseTitle}</span>
                    {/* Add Freq Here */}
                    <span className="expenseItemCont">
                      ${val.expenseAmount}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="incomesContainer">
              <h3 className="incomeLine">
                <div>${elements.Amount}</div>
                <div>{elements.Freq}</div>
              </h3>
            </div>
          )}
          <div className="blockIconsCont">
            <div className="blockIcons">
              <Pencil
                className="blockIcon"
                size={30}
                onClick={editElm}
              />
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
