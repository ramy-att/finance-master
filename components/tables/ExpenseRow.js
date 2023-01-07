import { useRef, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
const ExpenseRow = (props) => {
  const { idx, expense, expenseRowChange } = props;

  const expenseTitleRef = useRef(null);
  const expenseAmountRef = useRef(null);
  const expenseFreq = useRef(null);

  const [deleteItem, setDeleteItem] = useState(false);

  const onChangeHandler = () => {
    if (deleteItem) {
      expenseRowChange(true, idx);
    }
    expenseRowChange(
      false,
      idx,
      expenseTitleRef.current.value,
      expenseAmountRef.current.value || 0,
      expenseFreq.current.value
    );
  };
  return (
    <tr>
      <td>{idx}</td>
      <td>
        <FormControl
          ref={expenseTitleRef}
          defaultValue={expense.ExpenseTitle}
          onChange={onChangeHandler}
        />
      </td>
      <td>
        <FormControl
          ref={expenseAmountRef}
          type="number"
          defaultValue={expense.ExpenseAmount}
          onChange={onChangeHandler}
        />
      </td>
      <td>
        <Form.Select
          required
          className="selectCompounding"
          defaultValue={expense.ExpenseFreq}
          onChange={onChangeHandler}
          ref={expenseFreq}
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="BiWeekly">Bi-Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Semi-Annually">Semi-Annually</option>
          <option value="Annually">Annually</option>
        </Form.Select>
      </td>
      <td
        onClick={() => {
          setDeleteItem(true);
          onChangeHandler();
        }}
        className="tableIcon expenseRowDel"
      >
        <Trash size={20} />
      </td>
    </tr>
  );
};

export default ExpenseRow;
