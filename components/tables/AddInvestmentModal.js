import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { authActions } from "../store";
import { useDispatch } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

const AddInvestmentModal = (props) => {
  const { typeOfAction, incomeKey } = props;
  const investmentType = useRef(null);
  const [investmentIncome, setInvestmentIncome] = useState("GIC/CD");

  const purchaseDateRef = useRef(null);
  const durationRef = useRef(null);
  const interestRef = useRef(null);
  const investmentAmountRef = useRef(null);
  const bankRef = useRef(null);
  const payoutFrequencyRef = useRef(null);

  const userInfo = useSelector((state) => state.userInfo);
  const incomes = useSelector((state) => state.userIncomes);

  // Redux dispatch
  const dispatch = useDispatch();

  const changeInvestment = () => {
    if (investmentType.current !== null) {
      if (investmentType.current.value == 1) {
        setInvestmentIncome("GIC/CD");
      } else if (investmentType.current.value == 2) {
        setInvestmentIncome("Stocks");
      } else {
        setInvestmentIncome("Crypto");
      }
    }
  };

  const modalTitle =
    typeOfAction == "edit" ? "Edit Your Investment" : "Add New Investment";

  const formHandler = async (e) => {
    e.preventDefault();
    if (investmentType.current.value == 1) {
      // GIC
      const purchaseDate = purchaseDateRef.current.value;
      const duration = durationRef.current.value;
      const payoutFreq = payoutFrequencyRef.current.value;
      const amount = investmentAmountRef.current.value;
      const interest = interestRef.current.value / 100;
      const bank = bankRef.current.value;
      const maturedAmount = 0;
      const interestAmount = 0;

      const formula = () => {
        const n = 1;
        const future = amount * Math.pow(1 + interest, n * duration);
        return future;
      };

      if (
        (duration > 1 && payoutFreq != 1) ||
        (duration == 1 && !(payoutFreq == 1 || payoutFreq == 2))
      ) {
        // Longer than a year and not paid out at maturity or
        // One year and not paid out annually or at maturity
        // matured amount stays the same since interest is paid out every period
        maturedAmount = amount;
        interestAmount = interest * amount * duration;
      } else {
        // matured amount > amount due to interest
        maturedAmount = formula();
        interestAmount = maturedAmount - amount;
      }
      // API REQUEST BELOW
      const data = {
        purchaseDate: purchaseDate,
        duration: duration,
        payoutFreq: payoutFreq,
        amount: amount,
        interest: interest,
        bank: bank,
        maturedAmount: maturedAmount,
        interestAmount: interestAmount,
      };
      console.log(data);
      const endpoint = "/api/investment";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          localId: userInfo.localId,
          token: userInfo.idToken,
          type: "GIC/CD",
          data: data,
        }),
      };
      const response = await fetch(endpoint, options);
      console.log(response);
      const result = await response.json();
      if (!result.error) {
        console.log(result);
        dispatch(authActions.updateInvestments(result));
        // incomeAmount.current.value = "";
        // incomeSrc.current.value = "1";
        console.log(result);
      }
    }
  };
  // async function getServerSideProps(context) {
  //   const url =
  //     "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=INDEX&apikey=ROAPGSXI5YJ08S6W";
  //   const response = await fetch(url, {
  //     method: "GET",
  //     header: {
  //       "Content/type": "application/json",
  //     },
  //   });
  //   const result = await response.json();
  //   console.log(result);
  //   return {
  //     props: {}, // will be passed to the page component as props
  //   };
  // }

  const options = [
    {
      label: "Alabama",
      population: 4780127,
      capital: "Montgomery",
      region: "South",
    },
    { label: "Alaska", population: 710249, capital: "Juneau", region: "West" },
    {
      label: "Arizona",
      population: 6392307,
      capital: "Phoenix",
      region: "West",
    },
    {
      label: "Arkansas",
      population: 2915958,
      capital: "Little Rock",
      region: "South",
    },
    {
      label: "Arkansas",
      population: 2915958,
      capital: "Little Rock",
      region: "South",
    },
    {
      label: "Arkansas",
      population: 2915958,
      capital: "Little Rock",
      region: "South",
    },
    {
      label: "Arkansas",
      population: 2915958,
      capital: "Little Rock",
      region: "South",
    },
    {
      label: "Arkansas",
      population: 2915958,
      capital: "Little Rock",
      region: "South",
    },
    {
      label: "Arkansas",
      population: 2915958,
      capital: "Little Rock",
      region: "South",
    },
    {
      label: "Arkansas",
      population: 2915958,
      capital: "Little Rock",
      region: "South",
    },
    {
      label: "Arkansas",
      population: 2915958,
      capital: "Little Rock",
      region: "South",
    },
    {
      label: "Arkansas",
      population: 2915958,
      capital: "Little Rock",
      region: "South",
    },
  ];
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="AddModalBody">
        <Form onSubmit={formHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Investment Type</Form.Label>
            <Form.Select
              ref={investmentType}
              onChange={changeInvestment}
              required
              className="selectCompounding"
            >
              <option value="1">GIC/CD</option>
              <option value="2">Stocks/Index & Mutual Funds</option>
              <option value="3">Cryptocurrency</option>
              {/* Add Gold later */}
            </Form.Select>
          </Form.Group>
          {investmentIncome == "GIC/CD" && (
            <>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Purchase Date</Form.Label>
                <Form.Control type="date" ref={purchaseDateRef} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Duration in Years</Form.Label>
                <Form.Control type="number" ref={durationRef} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Payout Frequency</Form.Label>
                <Form.Select
                  ref={payoutFrequencyRef}
                  onChange={changeInvestment}
                  required
                  className="selectCompounding"
                >
                  <option value="1">At Maturity</option>
                  <option value="2">Annually</option>
                  <option value="3">Semi-Annually</option>
                  <option value="3">Quarterly</option>
                  <option value="3">Monthly</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Locked Amount</Form.Label>
                <Form.Control
                  type="number"
                  step="0.001"
                  placeholder="$100,000"
                  required
                  ref={investmentAmountRef}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Annual Interest</Form.Label>
                <Form.Control
                  type="number"
                  step="0.001"
                  placeholder="5%"
                  required
                  ref={interestRef}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Financial Inst Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Royal Bank of Canada"
                  required
                  ref={bankRef}
                />
              </Form.Group>
            </>
          )}
          {investmentIncome == "Stocks" && (
            <>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Purchase Date</Form.Label>
                <Form.Control type="date" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Name/Symbol</Form.Label>
                {/* Allow search endpoint here */}
                {/* <Form.Control type="search" required /> */}
                <Typeahead
                  className="typeahead"
                  // onChange={setSelected}
                  options={options}
                  placeholder="Choose a stock..."
                  // selected={selected}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Number of Stocks</Form.Label>
                <Form.Control
                  type="number"
                  step="0.001"
                  placeholder="10"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price/Qty at Purchase</Form.Label>
                <Form.Control
                  type="number"
                  step="0.001"
                  placeholder="$475.25"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Financial Inst Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Royal Bank of Canada"
                  required
                />
              </Form.Group>
            </>
          )}
          {investmentIncome == "Crypto" && (
            <>
              <Form.Group>
                <Form.Label>Name/Symbol</Form.Label>
                {/* Allow search endpoint here */}
                <Form.Control type="text" placeholder="Bitcoin" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Number of Coins</Form.Label>
                <Form.Control
                  type="number"
                  step="0.001"
                  placeholder="10"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price/Qty at Purchase</Form.Label>
                <Form.Control
                  type="number"
                  step="0.001"
                  placeholder="$475.25"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Financial Inst Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Royal Bank of Canada"
                  required
                />
              </Form.Group>
            </>
          )}
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
        <Button onClick={props.onHide} variant="danger">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default AddInvestmentModal;
