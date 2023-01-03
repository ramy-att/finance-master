import Block from "../Block/Block";
import { Col, Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import AddLoanModal from "../tables/AddLoanModal";
import { useDispatch } from "react-redux";
import { authActions } from "../store";

export const Loans = (props) => {
  const loans = useSelector((state) => state.userLoans);
  const userInfo = useSelector((state) => state.userInfo);

  const [showLoansModal, setShowLoansModal] = useState(false);
  const [key, setKey] = useState("");
  const [loansAction, setLoansAction] = useState("");

  const dispatch = useDispatch();

  const deleteItem = async (key) => {
    const endpoint = "/api/loan";
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
      dispatch(authActions.deleteLoan(result.deletedName));
    }
  };
  const counter = 0;
  return (
    <Container class="budgetContainer">
      <h1 className="budgetRowTitle">Loans</h1>
      <div class="budgetRow">
        {Object.entries(loans).map(([key, val]) => {
          console.log(key)
          counter++;
            return (
              <Block
                key={`${key}--loanBlock`}
                title={`Loan #${counter}`}
                type="loans"
                idx={key}
                editElm={() => {
                  setShowLoansModal(true);
                  setLoansAction("edit");
                  setKey(key);
                }}
                deleteElm={() => {
                  deleteItem(key);
                }}
                elements={val}
              />
            );
        })}
        <Block
          onClick={() => {
            setShowLoansModal(true);
          }}
          state="addMore"
          type="loans"
        />
      </div>
        {console.log(loansAction)}
      <AddLoanModal
        typeofaction={loansAction}
        loankey={key}
        show={showLoansModal}
        onHide={() => setShowLoansModal(false)}
      />
      {/* Add a bar chart showing In vs Out */}
    </Container>
  );
};
