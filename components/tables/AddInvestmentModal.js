import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { authActions } from "../store";
import { useDispatch } from "react-redux";

const AddInvestmentModal = (props) => {
  const { typeofaction, investKey, defaultType, hideModal } = props;

  const userInfo = useSelector((state) => state.userInfo);
  const investments = useSelector((state) => state.userInvestments);

  const [editing, setEditing] = useState(typeofaction == "edit");
  const [investmentIncome, setInvestmentIncome] = useState(
    typeofaction == "edit" ? investments[investKey].type : "GIC/CD"
  );
  // REFS
  const investmentType = useRef(null);
  const purchaseDateRef = useRef(null);
  const durationRef = useRef(null);
  const interestRef = useRef(null);
  const investmentAmountRef = useRef(null);
  const bankRef = useRef(null);
  const payoutFrequencyRef = useRef(null);
  const stockNameRef = useRef(null);
  const numberStocksRef = useRef(null);
  const stockPriceRef = useRef(null);
  const currentStockPriceRef = useRef(null);
  const dividentRef = useRef(null);
  const dividentFreqRef = useRef(null);

  // Redux dispatch
  const dispatch = useDispatch();

  const changeInvestment = () => {
    if (investmentType.current !== null) {
      if (investmentType.current.value == "GIC/CD") {
        setInvestmentIncome("GIC/CD");
      } else if (investmentType.current.value == "Stocks") {
        setInvestmentIncome("Stocks");
      } else {
        setInvestmentIncome("Crypto");
      }
    }
  };
  useEffect(() => {
    changeInvestment();
  }, [defaultType]);
  const modalTitle = editing ? "Edit Your Investment" : "Add New Investment";

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
  const getInvestment = () => {
    let data = {};
    if (investmentType.current.value == "GIC/CD") {
      // GIC
      const purchaseDate = purchaseDateRef.current.value;
      const duration = durationRef.current.value;
      const payoutFreq = payoutFrequencyRef.current.value;
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
      purchaseDateRef.current.value = "";
      durationRef.current.value = "";
      payoutFrequencyRef.current.value = "Maturity";
      investmentAmountRef.current.value = "";
      interestRef.current.value = "";
      bankRef.current.value = "";
    } else if (investmentType.current.value == "Stocks") {
      // Stocks
      const purchaseDate = purchaseDateRef.current.value;
      const stockName = stockNameRef.current.value;
      const numberStocks = numberStocksRef.current.value;
      const stockPrice = stockPriceRef.current.value;
      const currentStockPrice = currentStockPriceRef.current.value;
      const divident = dividentRef.current.value || 0;
      const dividentFreq = divident == 0 ? "" : dividentFreqRef.current.value;
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
      purchaseDateRef.current.value = "";
      stockNameRef.current.value = "";
      numberStocksRef.current.value = "";
      stockPriceRef.current.value = "";
      currentStockPriceRef.current.value = "";
      dividentRef.current ? (dividentRef.current.value = "") : null;
      dividentFreqRef.current != null
        ? (dividentFreqRef.current.value = "1")
        : null;
      bankRef.current.value = "";
    } else {
      //CRYPTO
      const stockName = stockNameRef.current.value;
      const numberStocks = numberStocksRef.current.value;
      const purchaseDate = purchaseDateRef.current.value;
      const stockPrice = stockPriceRef.current.value;
      const currentStockPrice = currentStockPriceRef.current.value;
      const bank = bankRef.current.value;

      data = {
        coinName: stockName,
        numberCoins: numberStocks,
        purchaseDate: purchaseDate,
        coinPrice: stockPrice,
        currentPrice: currentStockPrice,
        bank: bank,
      };
      stockNameRef.current.value = "";
      numberStocksRef.current.value = "";
      purchaseDateRef.current.value = "";
      stockPriceRef.current.value = "";
      currentStockPriceRef.current.value = "";
      bankRef.current.value = "";
    }
    return data;
  };
  const getIncome = async (src, amt, freq) => {
    const endpoint = "/api/income";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        localId: userInfo.localId,
        token: userInfo.idToken,
        source: src,
        amount: amt,
        incomeFreq: freq,
      }),
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    if (!result.error) {
      dispatch(authActions.updateIncomes(result));
    }
  };
  const formHandler = async (e) => {
    e.preventDefault();
    const data = getInvestment();
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
            type: investmentType.current.value,
            data: data,
          })
        : JSON.stringify({
            localId: userInfo.localId,
            token: userInfo.idToken,
            type: investmentType.current.value,
            data: data,
          }),
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    investmentType.current.value == "GIC/CD" &&
    payoutFrequencyRef.current.value != "Maturity"
      ? getIncome("GIC/CD", data.payoutAmount, data.payoutFreq)
      : investmentType.current.value == "Stocks"
      ? getIncome("Dividents", data.divident, data.dividentFreq)
      : null;
    if (!result.error) {
      dispatch(authActions.updateInvestments(result));
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
              defaultValue={
                editing && investKey
                  ? investments[investKey].type
                  : defaultType
                  ? defaultType
                  : null
              }
            >
              <option value="GIC/CD">GIC/CD</option>
              <option value="Stocks">Stocks/Index & Mutual Funds</option>
              <option value="Crypto">Cryptocurrency</option>
            </Form.Select>
          </Form.Group>
          {investmentIncome == "GIC/CD" && (
            <>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Purchase Date</Form.Label>
                <Form.Control
                  type="date"
                  defaultValue={
                    editing && investKey
                      ? investments[investKey].purchaseDate
                      : null
                  }
                  ref={purchaseDateRef}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Duration in Years</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={
                    editing && investKey
                      ? investments[investKey].duration
                      : null
                  }
                  step="0.01"
                  min="0"
                  ref={durationRef}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Payout Frequency</Form.Label>
                <Form.Select
                  ref={payoutFrequencyRef}
                  onChange={changeInvestment}
                  required
                  className="selectCompounding"
                  defaultValue={
                    editing && investKey
                      ? investments[investKey].payoutFreq
                      : null
                  }
                >
                  <option value="Maturity">At Maturity</option>
                  <option value="Annually">Annually</option>
                  <option value="Semi-Annually">Semi-Annually</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Monthly">Monthly</option>
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
                  defaultValue={
                    editing && investKey ? investments[investKey].amount : null
                  }
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
                  defaultValue={
                    editing && investKey
                      ? investments[investKey].interest * 100
                      : null
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Financial Inst Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Royal Bank of Canada"
                  required
                  ref={bankRef}
                  defaultValue={
                    editing && investKey ? investments[investKey].bank : null
                  }
                />
              </Form.Group>
            </>
          )}
          {investmentIncome == "Stocks" && (
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
                    ref={dividentFreqRef}
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
          )}
          {investmentIncome == "Crypto" && (
            <>
              <Form.Group>
                <Form.Label>Name/Symbol</Form.Label>
                {/* Allow search endpoint here */}
                <Form.Control
                  ref={stockNameRef}
                  type="text"
                  placeholder="Bitcoin"
                  required
                  defaultValue={
                    editing && investKey
                      ? investments[investKey].coinName
                      : null
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Purchase Date</Form.Label>
                <Form.Control
                  type="date"
                  defaultValue={
                    editing && investKey
                      ? investments[investKey].purchaseDate
                      : null
                  }
                  ref={purchaseDateRef}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Number of Coins</Form.Label>
                <Form.Control
                  type="number"
                  step="0.001"
                  placeholder="10"
                  required
                  ref={numberStocksRef}
                  defaultValue={
                    editing && investKey
                      ? investments[investKey].numberCoins
                      : null
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price/Qty at Purchase</Form.Label>
                <Form.Control
                  type="number"
                  step="0.001"
                  placeholder="$475.25"
                  required
                  ref={stockPriceRef}
                  defaultValue={
                    editing && investKey
                      ? investments[investKey].stockPrice ||
                        investments[investKey].coinPrice
                      : null
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Current Price/Qty</Form.Label>
                <Form.Control
                  type="number"
                  step="0.001"
                  placeholder="$475.25"
                  required
                  ref={currentStockPriceRef}
                  defaultValue={
                    editing && investKey
                      ? investments[investKey].currentStockPrice ||
                        investments[investKey].currentPrice
                      : null
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Financial Inst Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Royal Bank of Canada"
                  required
                  ref={bankRef}
                  defaultValue={
                    editing && investKey ? investments[investKey].bank : null
                  }
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
