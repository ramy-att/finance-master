import { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Block from "../Block/Block";
import { authActions } from "../store";
import AddLoanModal from "../tables/AddLoanModal";

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
  const hideModal = () => {
    setShowLoansModal(false);
    setKey("");
    setLoansAction("");
  };
  const counter = 0;
  return (
    <Container class="budgetContainer">
      <h1 className="budgetRowTitle">Loans</h1>
      <div class="budgetRow">
        {Object.entries(loans).map(([key, val]) => {
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
      {showLoansModal && (
        <AddLoanModal
          typeofaction={loansAction}
          loankey={key}
          show={showLoansModal}
          hideModal={hideModal}
          onHide={hideModal}
        />
      )}
      {/* Add a bar chart showing In vs Out */}
    </Container>
  );
};
