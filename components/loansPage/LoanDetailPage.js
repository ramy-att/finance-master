import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import LoanInfo from "../Loans/LoanInfo";

const LoanDetailPage = (props) => {
  const { idx } = props; // Firebase IDX!!!
  const loans = useSelector((state) => state.userLoans);
  const userInfo = useSelector((state) => state.userInfo);
  return (
    <Container fluid>
      <div className="text-center loanDetailPage">
        <h1>Loan Information</h1>
        <LoanInfo data={loans[idx]} />
      </div>
    </Container>
  );
};
export default LoanDetailPage;
