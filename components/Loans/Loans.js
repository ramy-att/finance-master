import { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import LoanInfo from "./LoanInfo";
import useLoanCalc from "../hooks/useLoanCalc";

const Loans = () => {
  const principal = useRef(null);
  const downPayment = useRef(null);
  const interest = useRef(null);
  const duration = useRef(null);
  const freq = useRef(null);
  const [payment, setPayment] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const loanInfo = useLoanCalc(
    downPayment,
    principal,
    interest,
    duration,
    freq,
    submitted
  );

  const [data, setData] = useState(null);

  useEffect(() => {
    setData(loanInfo);
  }, [loanInfo]);

  const calculator = (evt) => {
    evt.preventDefault();
    setSubmitted(true);
  };

  return (
    <Container fluid className="LoanPage">
      <Row>
        <Col>
          <div className="titleContainer">
            <h1>Loan Payment Schedule</h1>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg="6">
          <div>
            <h2>Calculator</h2>
          </div>
          <Form className="interestCalcForm" onSubmit={calculator}>
            <div className="interestCalcFormG">
              <Row>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Principal</Form.Label>
                  <Form.Control
                    ref={principal}
                    required
                    type="number"
                    step=".001"
                    placeholder="$100000"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Down Payment</Form.Label>
                  <Form.Control
                    ref={downPayment}
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
                    ref={interest}
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
                    ref={duration}
                    required
                    type="number"
                    placeholder="5 Years"
                  />
                </Form.Group>
              </Row>
            </div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Payment Frequency</Form.Label>
              <Form.Select ref={freq} required className="selectCompounding">
                <option value="1">Annual</option>
                <option value="2">Semi-Annual</option>
                <option value="3">Quarterly</option>
                <option value="4">Monthly</option>
                <option value="5">Bi-Weekly</option>
              </Form.Select>
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit" className="submitButton">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
        <Col>
          <h2>Payment Schedule</h2>
          {data == null && <h3 className="text-center">No Results Yet</h3>}
          {data && <LoanInfo data={data} />}
        </Col>
      </Row>
    </Container>
  );
};
export default Loans;
