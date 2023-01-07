import Modal from "react-bootstrap/Modal";
import { FormControl, Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { authActions } from "../store";
import { useDispatch } from "react-redux";
import ExpenseRow from "./ExpenseRow";
import { PlusCircle, Pencil } from "react-bootstrap-icons";
const AddExpenseModal = (props) => {
  // PROPS
  const { typeofaction, expensekey, hideModal } = props;
  // REDUX Storage
  const userInfo = useSelector((state) => state.userInfo);
  const expenses = useSelector((state) => state.userExpenses);
  const dispatch = useDispatch();
  // STATES
  const [editing, setEditing] = useState(typeofaction == "edit");
  const [categoryTotal, setCategoryTotal] = useState(
    editing ? expenses[expensekey].CategoryTotal : null
  );
  const [expensesToEdit, setExpensesToEdit] = useState([]);
  useEffect(() => {
    setEditing(typeofaction == "edit");
    setExpensesToEdit(
      typeofaction == "edit" ? expenses[expensekey].CategoryExpenses : ""
    );
  }, [typeofaction, expensekey]);

  // REFS
  const categoryTitleRef = useRef(null);
  useEffect(() => {
    let total = 0;
    if (expensesToEdit.length > 0) {
      expensesToEdit.map((item) => {
        total +=
          item.ExpenseAmount == undefined
            ? 0
            : item.ExpenseFreq == "Daily"
            ? parseFloat(item.ExpenseAmount) * 365
            : item.ExpenseFreq == "Weekly"
            ? parseFloat(item.ExpenseAmount) * 52
            : item.ExpenseFreq == "Biweekly"
            ? parseFloat(item.ExpenseAmount) * 26
            : item.ExpenseFreq == "Monthly"
            ? parseFloat(item.ExpenseAmount) * 12
            : item.ExpenseFreq == "Quarterly"
            ? parseFloat(item.ExpenseAmount) * 4
            : item.ExpenseFreq == "Semi-Annually"
            ? parseFloat(item.ExpenseAmount) * 2
            : parseFloat(item.ExpenseAmount);
      });
      setCategoryTotal(total);
    }
  }, [expensesToEdit]);

  const modalTitle = editing ? "Edit Category: " : "Add New Category: ";
  const buttonText = editing ? "Save Changes" : "Submit";
  const expenseRowChangeHandler = (del, idx, title, amount, freq) => {
    const array = [...expensesToEdit];
    if (del) {
      array.splice(idx, 1); // 2nd parameter means remove one item only
    } else {
      array[idx] = {
        ExpenseTitle: title,
        ExpenseAmount: amount,
        ExpenseFreq: freq,
      };
    }
    setExpensesToEdit(array);
  };
  const addNewRow = () => {
    setExpensesToEdit([...expensesToEdit, {}]);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const endpoint = "/api/expense";
    let options;
    console.log(categoryTitleRef.current);
    const title =
      categoryTitleRef.current != null
        ? categoryTitleRef.current.value
        : "New Category";
    if (editing) {
      options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldName: expensekey,
          localId: userInfo.localId,
          token: userInfo.idToken,
          CategoryTitle: title,
          CategoryTotal: categoryTotal,
          CategoryExpenses: [...expensesToEdit],
        }),
      };
    } else if (!editing) {
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          localId: userInfo.localId,
          token: userInfo.idToken,
          CategoryTitle: title,
          CategoryTotal: categoryTotal,
          CategoryExpenses: [...expensesToEdit],
        }),
      };
    }
    const response = await fetch(endpoint, options);
    const result = await response.json();
    if (!result.error) {
      dispatch(authActions.updateExpenses(result));
      editing ? hideModal() : null;
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="ModalHeaderCont">
            <div>{modalTitle}</div>
            <div className="ModalHeaderTitle">
              {editing ? (
                <FormControl
                  ref={categoryTitleRef}
                  defaultValue={expenses[expensekey].CategoryTitle}
                />
              ) : (
                <FormControl ref={categoryTitleRef} />
              )}
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="AddModalBody">
        <Form onSubmit={submitHandler}>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Expense Name</th>
                <th>Amount</th>
                <th>Freq</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {expensesToEdit.length > 0 &&
                expensesToEdit.map((expense, idx) => {
                  return (
                    <ExpenseRow
                      key={`${idx}--expenseRow`}
                      expenseRowChange={expenseRowChangeHandler}
                      expense={expense}
                      idx={idx}
                    />
                  );
                })}
              <tr className="addNewExpenseRow">
                <td colSpan={5} onClick={addNewRow}>
                  Add New Expense <PlusCircle size={20} />
                </td>
              </tr>
            </tbody>
          </Table>
          <div>Annual Category Total: ${categoryTotal}</div>
          <div className="modalSubmitCont text-center">
            <Button
              variant="primary"
              type="submit"
              className="submitButton modalSubmit"
            >
              {buttonText}
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="danger">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default AddExpenseModal;
