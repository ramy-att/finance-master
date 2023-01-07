import { useRef } from "react";
import { Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const FutureAmount = (props) => {
  const { resultsHandler } = props;
  const principal = useRef(0);
  const duration = useRef(0);
  const contrib = useRef(0);
  const freq = useRef(0);
  const interest = useRef(0);
  const comp = useRef(0);
  const inflation = useRef(0);
  const taxes = useRef(0);

  const calculator = (event) => {
    event.preventDefault();
    const princ = principal.current.valueAsNumber;
    const dur = duration.current.valueAsNumber;
    const contribution = contrib.current.value || 0;
    const frequency = freq.current.value;
    const int = interest.current.valueAsNumber;
    const compouding = comp.current.value;
    const inf = inflation.current.valueAsNumber || 0;
    const tax = taxes.current.valueAsNumber || 0;

    const realInterest = (int / 100 - inf / 100) / (1 + inf / 100);
    const n =
      compouding == 1
        ? 1
        : compouding == 2
        ? 2
        : compouding == 3
        ? 4
        : compouding == 4
        ? 12
        : null;
    const contributions =
      contribution === 0
        ? 0
        : frequency == 1
        ? contribution
        : frequency == 2
        ? contribution * 2
        : frequency == 3
        ? contribution * 4
        : frequency == 4
        ? contribution * 12
        : null;
    const formula = (duration = dur) => {
      const future =
        princ * Math.pow(1 + realInterest, n * duration) +
        (contributions / realInterest) *
          (Math.pow(1 + realInterest, n * duration) - 1);
      return future;
    };
    const f = formula();
    const future = f.toFixed(2);
    const interestCollected = future - princ;
    const taxAmount = (tax / 100) * interestCollected;
    const investment = interestCollected - taxAmount;
    const annualData = [];

    for (let i = 1; i <= dur; i++) {
      const f = formula(i);
      annualData.push(f.toFixed(2));
    }
    const data = {
      future: future,
      annualData: [...annualData],
      interest: interestCollected,
      taxes: taxAmount,
      investment: investment,
    };
    resultsHandler(data);
  };
  return (
    <Form className="interestCalcForm" onSubmit={calculator}>
      <div className="interestCalcFormG">
        <Row>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Principal</Form.Label>
            <Form.Control
              ref={principal}
              required
              type="number"
              placeholder="$10000"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              ref={duration}
              required
              type="number"
              min="1"
              placeholder="5 Years"
            />
          </Form.Group>
        </Row>
      </div>
      <div className="interestCalcFormG">
        <Row>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Contribution</Form.Label>
            <Form.Control ref={contrib} type="number" placeholder="$1000" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Contrib Freq</Form.Label>
            <Form.Select ref={freq} required>
              <option value="1">Annual</option>
              <option value="2">Semi-Annual</option>
              <option value="3">Quarterly</option>
              <option value="4">Monthly</option>
            </Form.Select>{" "}
          </Form.Group>
        </Row>
      </div>
      <div className="interestCalcFormG">
        <Row>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Interest</Form.Label>
            <Form.Control
              ref={interest}
              type="number"
              required
              min="0"
              placeholder="5%"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Compounding</Form.Label>
            <Form.Select ref={comp} required>
              <option value="1">Annual</option>
              <option value="2">Semi-Annual</option>
              <option value="3">Quarterly</option>
              <option value="4">Monthly</option>
            </Form.Select>
          </Form.Group>
        </Row>
      </div>
      <div className="interestCalcFormG">
        <Row>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Inflation</Form.Label>
            <Form.Control
              ref={inflation}
              type="number"
              min="0"
              placeholder="3%"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tax Rate</Form.Label>
            <Form.Control ref={taxes} type="number" min="0" placeholder="15%" />
          </Form.Group>
        </Row>
      </div>
      <div className="text-center">
        <Button variant="primary" type="submit" className="submitButton">
          Submit
        </Button>
        
      </div>
    </Form>
  );
};
export default FutureAmount;
