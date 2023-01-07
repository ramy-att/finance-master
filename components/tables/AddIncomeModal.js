import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { authActions } from "../store";
import { useDispatch } from "react-redux";

const AddIncomeModal = (props) => {
  const { typeofaction, incomekey } = props;

  // REFS
  // INCOME REFS
  const incomeSrc = useRef(null);
  const incomeAmount = useRef(null);
  const incomeFreq = useRef(null);
  // INVESTMENT REFS
  const purchaseDateRef = useRef(null);
  const durationRef = useRef(null);
  const interestRef = useRef(null);
  const investmentAmountRef = useRef(null);
  const bankRef = useRef(null);
  const stockNameRef = useRef(null);
  const numberStocksRef = useRef(null);
  const stockPriceRef = useRef(null);
  const currentStockPriceRef = useRef(null);
  const dividentRef = useRef(null);

  //STATES
  const [investmentIncome, setInvestmentIncome] = useState("");
  const [otherIncome, setOtherIncome] = useState(false);
  const [editing, setEditing] = useState(typeofaction == "edit");
  //REDUX STORAGE
  const userInfo = useSelector((state) => state.userInfo);
  const incomes = useSelector((state) => state.userIncomes);

  useEffect(() => {
    setEditing(typeofaction == "edit");
  }, [typeofaction]);

  // Redux dispatch
  const dispatch = useDispatch();

  const changeIncomeSrc = () => {
    if (incomeSrc.current !== null) {
      if (
        incomeSrc.current.value == "GIC/CD" ||
        incomeSrc.current.value == "Stocks"
      ) {
        setInvestmentIncome(incomeSrc.current.value);
      } else if (incomeSrc.current.value == 5) {
        setOtherIncome(true);
      }
      if (incomeSrc.current.value != 5) {
        setOtherIncome(false);
      }
      if (
        incomeSrc.current.value != "GIC/CD" &&
        incomeSrc.current.value != "Stocks"
      ) {
        setInvestmentIncome("");
      }
    }
  };
  const endDateCalc = (startDate, value) => {
    const start = new Date(startDate);
    var totalDays = value * 365;
    var years = Math.floor(totalDays / 365);
    var months = Math.floor((totalDays - years * 365) / 30);
    var days = Math.floor(totalDays - years * 365 - months * 30);

    const endYear = start.getFullYear() + years;
    const endMonth = start.getMonth() + months + 1;
    const endDay = start.getDate() + days;
    return `${endYear}-${endMonth}-${
      endDay.toString().length == 2 ? endDay : `0${endDay}`
    }`;
  };
  const addInvestment = async () => {
    let data = {};
    let amt = 0;
    if (incomeSrc.current.value == "GIC/CD") {
      // GIC
      const purchaseDate = purchaseDateRef.current.value;
      const duration = durationRef.current.value;
      const payoutFreq = incomeFreq.current.value;
      const amount = investmentAmountRef.current.value;
      const interest = interestRef.current.value / 100;
      const bank = bankRef.current.value;
      const maturedAmount = 0;
      const interestAmount = 0;

      const startDate = new Date(purchaseDate);
      startDate.setDate(startDate.getDate() + 1);
      const maturityDate = endDateCalc(startDate, duration);

      const formula = () => {
        const n = 1;
        const future = amount * Math.pow(1 + interest, n * duration);
        return future;
      };
      const m =
        payoutFreq == "Monthly"
          ? 12
          : payoutFreq == "Quarterly"
          ? 4
          : payoutFreq == "Semi-Annually"
          ? 2
          : payoutFreq == "Annually"
          ? 1
          : 0;
      if (
        (duration > 1 && payoutFreq != "Maturity") ||
        (duration == 1 &&
          !(payoutFreq == "Maturity" || payoutFreq == "Annually"))
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
      data = {
        purchaseDate: purchaseDate,
        duration: duration,
        maturityDate: maturityDate,
        payoutFreq: payoutFreq,
        amount: amount,
        interest: interest,
        payoutAmount: interestAmount / (m * duration),
        bank: bank,
        maturedAmount: maturedAmount,
        interestAmount: interestAmount,
      };
      amt = interestAmount / (m * duration);
    } else if ((incomeSrc.current.value = "Stocks")) {
      // Stocks
      const purchaseDate = purchaseDateRef.current.value;
      const stockName = stockNameRef.current.value;
      const numberStocks = numberStocksRef.current.value;
      const stockPrice = stockPriceRef.current.value;
      const currentStockPrice = currentStockPriceRef.current.value;
      const divident = dividentRef.current.value || 0;
      const dividentFreq = divident == 0 ? "" : incomeFreq.current.value;
      const bank = bankRef.current.value;
      data = {
        purchaseDate: purchaseDate,
        stockName: stockName,
        numberStocks: numberStocks,
        stockPrice: stockPrice,
        totalPurchase: parseFloat(numberStocks) * parseFloat(stockPrice),
        totalCurrent: parseFloat(numberStocks) * parseFloat(currentStockPrice),
        bank: bank,
        currentStockPrice: currentStockPrice,
        divident: divident,
        dividentFreq: dividentFreq,
      };
      amt = divident;
    }
    const endpoint = "/api/investment";
    const options = {
      method: editing ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: editing
        ? JSON.stringify({
            oldName: investKey,
            localId: userInfo.localId,
            token: userInfo.idToken,
            type: incomeSrc.current.value,
            data: data,
          })
        : JSON.stringify({
            localId: userInfo.localId,
            token: userInfo.idToken,
            type: incomeSrc.current.value,
            data: data,
          }),
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    if (!result.error) {
      dispatch(authActions.updateInvestments(result));
    }
    return await amt;
  };
  const addIncome = async (e) => {
    e.preventDefault();
    const investmentAmount = await addInvestment();
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
        amount:
          incomeSrc.current.value == "GIC/CD" ||
          incomeSrc.current.value == "Stocks"
            ? investmentAmount
            : incomeAmount.current.value,
        incomeFreq: incomeFreq.current.value,
      }),
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    if (!result.error) {
      dispatch(authActions.updateIncomes(result));
      // incomeAmount.current.value = "";
      incomeSrc.current.value = "Salary";
      incomeFreq.current.value = "Daily";
    }
  };

  const editIncome = async (e) => {
    e.preventDefault();
    const endpoint = "/api/income";
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldName: incomekey,
        localId: userInfo.localId,
        token: userInfo.idToken,
        source: incomeSrc.current.value,
        amount: incomeAmount.current.value,
        incomeFreq: incomeFreq.current.value,
      }),
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    if (!result.error) {
      dispatch(authActions.updateIncomes(result));
      incomeAmount.current.value = "";
      incomeSrc.current.value = "Salary";
    }
  };

  const modalTitle =
    typeofaction == "edit"
      ? "Edit Your Income Source"
      : "Add New Income Source";
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
        <Form
          onSubmit={(e) => {
            editing ? editIncome(e) : addIncome(e);
          }}
        >
          <div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Income Source</Form.Label>
              <Form.Select
                ref={incomeSrc}
                onChange={changeIncomeSrc}
                required
                className="selectCompounding"
                defaultValue={editing ? incomes[incomekey].Category : null}
              >
                <option value="Salary">Job Salary</option>
                <option value="Business Profit">Business Profit</option>
                <option value="GIC/CD">GIC/CD</option>
                <option value="Stocks">Dividents</option>
                <option value="5">Other</option>
              </Form.Select>
            </Form.Group>
            {investmentIncome == "GIC/CD" ? (
              <>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Purchase Date</Form.Label>
                  <Form.Control ref={purchaseDateRef} type="date" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Duration in Years</Form.Label>
                  <Form.Control ref={durationRef} required />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Locked Amount</Form.Label>
                  <Form.Control
                    ref={investmentAmountRef}
                    type="number"
                    step="0.001"
                    min="1"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Annual Interest</Form.Label>
                  <Form.Control
                    ref={interestRef}
                    type="number"
                    step="0.001"
                    min="0.01"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Financial Inst Name</Form.Label>
                  <Form.Control ref={bankRef} type="text" required />
                </Form.Group>
              </>
            ) : investmentIncome == "Stocks" ? (
              <>
                <Form.Group>
                  <Form.Label>Name/Symbol</Form.Label>
                  <Form.Control
                    ref={stockNameRef}
                    placeholder="IBM"
                    defaultValue={
                      editing && investKey
                        ? investments[investKey].stockName
                        : null
                    }
                    type="input"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Purchase Date</Form.Label>
                  <Form.Control
                    ref={purchaseDateRef}
                    defaultValue={
                      editing && investKey
                        ? investments[investKey].purchaseDate
                        : null
                    }
                    type="date"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Number of Stocks</Form.Label>
                  <Form.Control
                    ref={numberStocksRef}
                    type="number"
                    step="0.001"
                    placeholder="10"
                    required
                    defaultValue={
                      editing && investKey
                        ? investments[investKey].numberStocks
                        : null
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Price/Qty at Purchase</Form.Label>
                  <Form.Control
                    ref={stockPriceRef}
                    type="number"
                    step="0.001"
                    placeholder="$475.25"
                    required
                    defaultValue={
                      editing && investKey
                        ? investments[investKey].stockPrice
                        : null
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Current Price/Qty</Form.Label>
                  <Form.Control
                    ref={currentStockPriceRef}
                    type="number"
                    step="0.001"
                    placeholder="$475.25"
                    required
                    defaultValue={
                      editing && investKey
                        ? investments[investKey].currentStockPrice
                        : null
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Financial Inst Name</Form.Label>
                  <Form.Control
                    ref={bankRef}
                    type="text"
                    placeholder="Royal Bank of Canada"
                    required
                    defaultValue={
                      editing && investKey ? investments[investKey].bank : null
                    }
                  />
                </Form.Group>
                <div className="interestCalcFormG">
                  <Form.Group>
                    <Form.Label>Divident Amount</Form.Label>
                    <Form.Control
                      ref={dividentRef}
                      type="number"
                      step="0.001"
                      placeholder="$475.25"
                      defaultValue={
                        editing && investKey
                          ? investments[investKey].divident
                          : null
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Divident Frequency</Form.Label>
                    <Form.Select
                      ref={incomeFreq}
                      className="selectCompounding"
                      defaultValue={
                        editing && investKey
                          ? investments[investKey].dividentFreq
                          : null
                      }
                    >
                      <option value="1">Annually</option>
                      <option value="2">Semi-Annually</option>
                      <option value="4">Quarterly</option>
                      <option value="12">Monthly</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </>
            ) : null}
            {otherIncome && (
              <Form.Group>
                <Form.Label>Income Source</Form.Label>
                <Form.Control
                  placeholder="Income Source"
                  ref={incomeSrc}
                  type="text"
                  defaultValue={editing ? incomes[incomekey].Category : null}
                />
              </Form.Group>
            )}
          </div>
          {!investmentIncome && (
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Income Amount</Form.Label>
              <Form.Control
                required
                type="number"
                step="0.001"
                ref={incomeAmount}
                defaultValue={editing ? incomes[incomekey].Amount : null}
                placeholder="Amount"
              />
            </Form.Group>
          )}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            {investmentIncome && investmentIncome != "Stocks" ? (
              <>
                <Form.Label>Payout Frequency</Form.Label>
                <Form.Select
                  ref={incomeFreq}
                  required
                  className="selectCompounding"
                  defaultValue={editing ? incomes[incomekey].Freq : null}
                >
                  <option value="Weekly">Annually</option>
                  <option value="Biweekly">Semi-Annually</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Monthly">Monthly</option>
                </Form.Select>
              </>
            ) : !investmentIncome || investmentIncome != "Stocks" ? (
              <>
                <Form.Label>Payout Frequency</Form.Label>
                <Form.Select
                  ref={incomeFreq}
                  required
                  className="selectCompounding"
                  defaultValue={editing ? incomes[incomekey].Freq : null}
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Biweekly">Biweekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Semi-Annually">Semi-Annually</option>
                  <option value="Annually">Annually</option>
                </Form.Select>
              </>
            ) : null}
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
        <Button onClick={props.onHide} variant="danger">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default AddIncomeModal;
