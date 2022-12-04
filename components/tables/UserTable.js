import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { useState } from "react";
import addMore from "../pictures/addMore.svg";
import Image from "next/image";
import AddIncomeModal from "./AddIncomeModal";
import AddExpenseModal from "./AddExpenseModal";

const UserTable = (props) => {
  const { type, data } = props;
  const [count, setCount] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const addNew = () => {
    return (
      <tr>
        <td>1</td>
        <td>Add Category</td>
        <td>Add Acmount</td>
      </tr>
    );
  };
  const add = () => {
    setShowAddModal(true);
  };
  return (
    <>
      <div className="userTable">
        <Table striped="columns">
          <thead>
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map((element) => {
                return (
                  <tr>
                    <td>1</td>
                    <td>{element["Category"]}</td>
                    <td>{element["Amount"]}</td>
                  </tr>
                );
              })}
            {!data || (data.length === 0 ? addNew() : null)}
            {/* doesn't work? */}
          </tbody>
        </Table>
      </div>
      <div className="tableAddMoreButton">
        <Button className="addMoreBtn" onClick={add}>
          <Image src={addMore} width="20" height="20" alt="Add More" />
        </Button>
      </div>
      {showAddModal && type == "incomes" && (
        <AddIncomeModal
          show={showAddModal}
          type={type}
          onHide={() => setShowAddModal(false)}
        />
      )}
      {showAddModal && type == "expenses" && (
        <AddExpenseModal
          show={showAddModal}
          type={type}
          onHide={() => setShowAddModal(false)}
        />
      )}
    </>
  );
};
export default UserTable;
