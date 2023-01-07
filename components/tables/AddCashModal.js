import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

const AddCashModal = (props) => {
  const {
    typeofaction,
    defType = "Chequing Account",
    cashKey,
    hideModal,
  } = props;
  const userInfo = useSelector((state) => state.userInfo);
  const cash = useSelector((state) => state.userCash);

  const dispatch = useDispatch();

  const [bankAccount, setBankAccount] = useState(true);
  const [asset, setAsset] = useState(false);
  const [editing, setEditing] = useState(typeofaction == "edit" || cashKey);

  const cashLocRef = useRef(null);
  const otherLocRef = useRef(null);
  const amountRef = useRef(null);
  const accNameRef = useRef(null);
  const bankNameRef = useRef(null);

  const changeCashLoc = () => {
    if (cashLocRef.current != null && cashLocRef.current.value == "Other") {
      setBankAccount(false);
    } else {
      setBankAccount(true);
    }
    if (cashLocRef.current != null && cashLocRef.current.value == "Asset") {
      setAsset(true);
    } else {
      setAsset(false);
    }
  };
  // Set when editing!
  useEffect(() => {
    changeCashLoc();
  }, [cashLocRef]);

  useEffect(() => {
    setEditing(typeofaction == "edit");
  }, [typeofaction]);
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
            type: cashLocRef.current.value,
            amount: amountRef.current.value,
            accountName: accNameRef.current.value,
            bank: !bankAccount || asset ? "" : bankNameRef.current.value,
          })
        : JSON.stringify({
            localId: userInfo.localId,
            token: userInfo.idToken,
            type: cashLocRef.current.value,
            amount: amountRef.current.value,
            accountName: accNameRef.current.value,
            bank: !bankAccount || asset ? "" : bankNameRef.current.value,
          }),
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    if (!result.error) {
      dispatch(authActions.updateCash(result));
      editing ? hideModal() : null;
      cashLocRef.current != null
        ? (cashLocRef.current.value = "Chequing Account")
        : null;
      otherLocRef.current != null ? (otherLocRef.current.value = "") : null;
      amountRef.current != null ? (amountRef.current.value = "") : null;
      accNameRef.current != null ? (accNameRef.current.value = "") : null;
      bankNameRef.current != null ? (bankNameRef.current.value = "") : null;
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
              defaultValue={editing && cashKey ? cash[cashKey].Type : defType}
              required
            >
              <option value="Chequing Account">Chequing Account</option>
              <option value="Savings Account">Savings Account</option>
              <option value="Investment Account">
                Investment Account (e.g. TFSA)
              </option>
              <option value="Asset">Asset</option>
              <option value="Other">Other</option>
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
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              ref={accNameRef}
              required
              defaultValue={
                editing && cashKey
                  ? cash[cashKey].AccountName || cash[cashKey].Type
                  : null
              }
              placeholder={asset ? "House" : "Main Savings"}
            />
          </Form.Group>
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
