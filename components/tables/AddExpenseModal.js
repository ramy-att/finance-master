import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useRef, useState } from "react";
const AddExpenseModal = (props) => {
  const incomeSrc = useRef(null);
  const [investmentIncome, setInvestmentIncome] = useState(false);
  const [otherIncome, setOtherIncome] = useState(false);

  const changeIncomeSrc = () => {
    if (incomeSrc.current !== null) {
      if (incomeSrc.current.value == 3 || incomeSrc.current.value == 4) {
        setInvestmentIncome(true);
      } else if (incomeSrc.current.value == 5) {
        setOtherIncome(true);
      }
      if (incomeSrc.current.value != 5) {
        setOtherIncome(false);
      }
      if (incomeSrc.current.value != 3 && incomeSrc.current.value != 4) {
        setInvestmentIncome(false);
      }
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
          Add New Expense Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="AddModalBody">
        <Form>
          <div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Category Name</Form.Label>
              <Form.Control placeholder="Category Name" type="text" />
            </Form.Group>
          </div>
          <div>
            Add Expenses
            {/* How to make it render new lines? */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <div className="addExpenseInModal">
                <Form.Control placeholder="Expense Name" type="text" />
                <Form.Control placeholder="Amount" type="number" step="0.001" />
              </div>
            </Form.Group>
          </div>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default AddExpenseModal;
