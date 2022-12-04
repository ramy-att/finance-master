import { useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import LoanInfo from "./LoanInfo";

const Loans = () => {
  const principal = useRef(null);
  const downPayment = useRef(null);
  const interest = useRef(null);
  const duration = useRef(null);
  const freq = useRef(null);
  const [payment, setPayment] = useState(0);
  const [data, setData] = useState(null);

  const schedule = (owed, int, freq, payment) => {
    let balance = owed;
    console.log(balance);
    let totalInterest = 0;
    const paymentAmt = payment;
    const payments = [];
    let paidTilNow = 0;
    while (balance > 0) {
      if (balance < 1) {
        break;
      }
      const interestAmt =
        freq == "monthly"
          ? (int * balance) / 12
          : freq == "semi-annual"
          ? (int * balance) / 2
          : freq == "quarterly"
          ? (int * balance) / 4
          : freq == "biweekly"
          ? (int * balance) / 26
          : int * balance;
      totalInterest += parseFloat(interestAmt);
      payments.push({
        payment: parseFloat(paymentAmt).toFixed(3),
        interest: interestAmt.toFixed(3),
        principal: (payment - interestAmt).toFixed(3),
        paidToDate: (paymentAmt + paidTilNow).toFixed(3),
      });
      paidTilNow += paymentAmt;
      balance -= paymentAmt - interestAmt;
    }
    // Total Interest Paid:
    const totalPaid = owed + totalInterest;
    return {
      initialOwed: owed.toFixed(3),
      totalPaid: totalPaid.toFixed(3),
      totalInterest: totalInterest.toFixed(3),
      payments: [...payments],
    };
  };
  const calculator = (evt) => {
    //M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
    //P= i(PV)/(1-(1+int)^-n)
    evt.preventDefault();
    const down = downPayment.current.valueAsNumber;
    const princ = principal.current.valueAsNumber - (down || 0);
    3;
    const ints = interest.current.valueAsNumber / 100;
    const years = duration.current.valueAsNumber;
    const frequeny = freq.current.value; // Annual, Semi, Quarterly, Monthly, Biweekly
    console.log(frequeny);
    //Find Number Of Periods
    let n;
    let f;
    if (frequeny == 1) {
      //annual
      n = years;
      f = "annual";
    } else if (frequeny == 2) {
      //semi
      n = years * 2;
      f = "semi-annual";
    } else if (frequeny == 3) {
      //quarter
      n = years * 4;
      f = "quarterly";
    } else if (frequeny == 4) {
      //month
      console.log(years * 12);
      n = years * 12;
      f = "monthly";
    } else if (frequeny == 5) {
      //biweekly
      f = "biweekly";
      n = (years * 12) / 26;
    }
    const paymentAmt = (ints * princ) / (1 - Math.pow(1 + ints, -1 * n));
    console.log(paymentAmt);
    const d = schedule(princ, ints, f, paymentAmt);
    setData(d);
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
