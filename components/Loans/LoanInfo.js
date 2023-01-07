import { useCallback, useRef } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { utils, writeFileXLSX } from "xlsx";

const LoanInfo = (props) => {
  const { data } = props;
  const table = useRef(null);

  const downloadExcel = useCallback(() => {
    const elt = table.current;
    if (elt !== null) {
      const wb = utils.table_to_book(elt);
      writeFileXLSX(wb, "myLoan.xlsx");
    } else {
      alert("Enter your data first!");
    }
  }, [table]);
  if (data) {
    return (
      <>
        <div className="interestTable">
          <Table striped="columns" ref={table}>
            <thead>
              <tr>
                <th>Payment #</th>
                <th>Payment Amount</th>
                <th>Interest Paid</th>
                <th>Principal Paid</th>
                <th>Paid To Date</th>
              </tr>
            </thead>
            <tbody>
              {data.payments.map((value, idx) => {
                return (
                  <tr key={idx}>
                    <td key={idx}>{idx + 1}</td>
                    <td key={idx}>
                      {value.payment
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td key={idx}>
                      {value.interest
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td key={idx}>
                      {value.principal
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td key={idx}>
                      {value.paidToDate
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div className="loanSummary">
          <div className="loanItem">
            Loan Amount: $
            {data.initialOwed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
          <div className="loanItem">
            Total Interest: $
            {data.totalInterest
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
          <div className="loanItem">
            Total Paid: $
            {data.totalPaid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
          <Button
            onClick={downloadExcel}
            className="submitButton downloadExcel"
          >
            Download as Excel
          </Button>
        </div>
      </>
    );
  }
};
export default LoanInfo;
