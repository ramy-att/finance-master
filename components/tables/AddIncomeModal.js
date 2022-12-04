import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const AddIncomeModal = (props) => {
  const incomeSrc = useRef(null);
  const otherIncomeSrc = useRef(null);
  const incomeAmount = useRef(null);

  const [investmentIncome, setInvestmentIncome] = useState(false);
  const [otherIncome, setOtherIncome] = useState(false);

  const userInfo = useSelector((state) => state.userInfo);

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

  const addIncome = async (e) => {
    e.preventDefault();
    const endpoint = "/api/income";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        localId: userInfo.localId,
        token: userInfo.idToken,
        source: incomeSrc.current.value,
        amount: incomeAmount.current.value,
      }),
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    // If result good return and ...
    incomeAmount.current.value = "";
    incomeSrc.current.value = "1";
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
          Add New Income Source
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="AddModalBody">
        <Form>
          <div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Income Source</Form.Label>
              <Form.Select
                ref={incomeSrc}
                onChange={changeIncomeSrc}
                required
                className="selectCompounding"
              >
                <option value="1">Job Salary</option>
                <option value="2">Business Profit</option>
                <option value="3">GIC/CD</option>
                <option value="4">Fixed Income (Dividents)</option>
                <option value="5">Other</option>
              </Form.Select>
            </Form.Group>
            {investmentIncome && (
              <>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Maturity Date</Form.Label>
                  <Form.Control type="date" required />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Locked Amount</Form.Label>
                  <Form.Control type="number" step="0.001" required />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Financial Inst Name</Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>
              </>
            )}
            {otherIncome && (
              <>
                <Form.Label>Income Source</Form.Label>
                <Form.Control
                  placeholder="Income Source"
                  ref={incomeSrc}
                  type="text"
                />
              </>
            )}
          </div>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Income Amount</Form.Label>
            <Form.Control
              required
              type="number"
              step="0.001"
              ref={incomeAmount}
              placeholder="Amount"
            />
          </Form.Group>
          <div className="modalSubmitCont text-center">
            <Button
              variant="primary"
              type="submit"
              className="submitButton modalSubmit"
            >
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button onClick={props.onHide} variant="danger" >Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default AddIncomeModal;
