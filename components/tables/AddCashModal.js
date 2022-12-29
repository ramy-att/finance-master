import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { authActions } from "../store";
import { useDispatch } from "react-redux";

const AddCashModal = (props) => {
  const { typeOfAction, cashKey } = props;

  const userInfo = useSelector((state) => state.userInfo);
  const cash = useSelector((state) => state.userCash);

  const dispatch = useDispatch();

  const [bankAccount, setBankAccount] = useState(true);
  const [asset, setAsset] = useState(false);
  const [editing, setEditing] = useState(typeOfAction == "edit");

  const cashLocRef = useRef(null);
  const otherLocRef = useRef(null);
  const amountRef = useRef(null);
  const accNameRef = useRef(null);
  const bankNameRef = useRef(null);

  const changeCashLoc = () => {
    if (cashLocRef.current != null && cashLocRef.current.value == "other") {
      setBankAccount(false);
    } else {
      setBankAccount(true);
    }
    if(cashLocRef.current !=null && cashLocRef.current.value == "Asset"){
        setAsset(true);
    }
    else{
        setAsset(false);
    }
  };
  const addCash = async (e) => {
    e.preventDefault();
    const endpoint = "/api/cash";
    const options = {
      method: editing ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: editing
        ? JSON.stringify({
            localId: userInfo.localId,
            token: userInfo.idToken,
            oldName: cashKey,
            location: !bankAccount
              ? otherLocRef.current.value
              : cashLocRef.current.value,
            amount: amountRef.current.value,
            accountName: !bankAccount ? "" : accNameRef.current.value,
            bank: !bankAccount ? "" : bankNameRef.current.value,
          })
        : JSON.stringify({
            localId: userInfo.localId,
            token: userInfo.idToken,
            location: !bankAccount
              ? otherLocRef.current.value
              : cashLocRef.current.value,
            amount: amountRef.current.value,
            accountName: !bankAccount ? "" : accNameRef.current.value,
            bank: !bankAccount || asset ? "" : bankNameRef.current.value,
          }),
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    if (!result.error) {
      dispatch(authActions.updateCash(result));
      //   incomeAmount.current.value = "";
      //   incomeSrc.current.value = "Salary";
      //   incomeFreq.current.value = "Daily";
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
        <Modal.Title id="contained-modal-title-vcenter">Add Cash</Modal.Title>
      </Modal.Header>
      <Modal.Body className="AddModalBody">
        <Form onSubmit={addCash}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Type</Form.Label>
            <Form.Select
              ref={cashLocRef}
              onChange={changeCashLoc}
              defaultValue={
                editing && cashKey ? cash[cashKey].Location : "Chequing Account"
              }
              required
            >
              <option value="Chequing Account">Chequing Account</option>
              <option value="Savings Account">Savings Account</option>
              <option value="Investment Account">
                Investment Account (e.g. TFSA)
              </option>
              <option value="Asset">Asset</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>
          {bankAccount && !asset && (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                ref={bankNameRef}
                defaultValue={editing && cashKey ? cash[cashKey].Bank : null}
                required
                placeholder="RBC"
              />
            </Form.Group>
          )}
          {bankAccount && (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                ref={accNameRef}
                required
                defaultValue={
                  editing && cashKey ? cash[cashKey].Location : null
                }
                placeholder="Main Savings"
              />
            </Form.Group>
          )}
          {!bankAccount && (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                ref={otherLocRef}
                required
                defaultValue={
                  editing && cashKey ? cash[cashKey].Location : null
                }
                placeholder="Appartment"
              />
            </Form.Group>
          )}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              required
              defaultValue={editing && cashKey ? cash[cashKey].Amount : null}
              type="number"
              placeholder="$10000"
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
        <Button onClick={props.onHide} variant="danger">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default AddCashModal;
