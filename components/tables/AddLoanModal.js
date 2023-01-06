import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { authActions } from "../store";
import { useDispatch } from "react-redux";
import useLoanCalc from "../hooks/useLoanCalc";

const AddLoanModal = (props) => {
  const { typeofaction, loankey } = props;

  const userInfo = useSelector((state) => state.userInfo);
  const loans = useSelector((state) => state.userLoans);

  const [submitted, setSubmitted] = useState(false);

  console.log(typeofaction);
  const principalRef = useRef(null);
  const downPaymentRef = useRef(null);
  const interestRef = useRef(null);
  const durationRef = useRef(null);
  const freqRef = useRef(null);

  const loanInfo = useLoanCalc(
    downPaymentRef,
    principalRef,
    interestRef,
    durationRef,
    freqRef,
    submitted
  );
  const dispatch = useDispatch();

  const addLoan = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  useEffect(() => {
    loanInfo != null ? createLoan() : null;
  }, [loanInfo]);

  const createLoan = async () => {
    if (submitted) {
      const endpoint = "/api/loan";
      const options = {
        method: typeofaction == "edit" ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: typeofaction == "edit"
          ? JSON.stringify({
              localId: userInfo.localId,
              token: userInfo.idToken,
              oldName: loankey,
              data: loanInfo,
            })
          : JSON.stringify({
              localId: userInfo.localId,
              token: userInfo.idToken,
              data: loanInfo,
            }),
      };
      const response = await fetch(endpoint, options);
      const result = await response.json();
      if (!result.error) {
        dispatch(authActions.updateLoans(result));
        setSubmitted(false);
      }
    }
  };

  const title = typeofaction == "edit" ? "Edit Loan" : "Add Loan";

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="AddModalBody">
        <Form onSubmit={addLoan}>
          <div className="interestCalcFormG">
            <Row>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Principal</Form.Label>
                <Form.Control
                  ref={principalRef}
                  required
                  type="number"
                  step=".001"
                  defaultValue={
                    typeofaction == "edit"
                      ? parseFloat(loans[loankey].initialOwed) +
                        parseFloat(loans[loankey].downPayment)
                      : null
                  }
                  placeholder="$100000"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Down Payment</Form.Label>
                <Form.Control
                  defaultValue={typeofaction == "edit" ? loans[loankey].downPayment : null}
                  ref={downPaymentRef}
                  type="number"
                  step=".001"
                  placeholder="$10000"
                />
              </Form.Group>
            </Row>
          </div>
          <div className="interestCalcFormG">
            <Row>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Interest Rate</Form.Label>
                <Form.Control
                  ref={interestRef}
                  defaultValue={
                    typeofaction == "edit" ? loans[loankey].interestRate * 100 : null
                  }
                  required
                  type="number"
                  min="0"
                  step=".001"
                  placeholder="5%"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Loan Term</Form.Label>
                <Form.Control
                  ref={durationRef}
                  defaultValue={typeofaction == "edit" ? loans[loankey].duration : null}
                  required
                  type="number"
                  placeholder="5 Years"
                />
              </Form.Group>
            </Row>
          </div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Payment Frequency</Form.Label>
            <Form.Select
              required
              className="selectCompounding"
              defaultValue={typeofaction == "edit" ? loans[loankey].frequency : null}
              ref={freqRef}
            >
              <option value="annual">Annual</option>
              <option value="semi-annual">Semi-Annual</option>
              <option value="quarterly">Quarterly</option>
              <option value="monthly">Monthly</option>
              <option value="biweekly">Bi-Weekly</option>
            </Form.Select>
          </Form.Group>
          <div className="text-center">
            <Button variant="primary" type="submit" className="submitButton">
              Submit
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
export default AddLoanModal;
