import { useState, createContext } from "react";
const context = createContext({
  token: "",
  isLoggedIn: false,
  login: (token, email, localId) => {},
  logout: () => {},
});

export const contextProvider = (props) => {
  const [token, setToken] = useState(sessionStorage.getItem("token")); //tells us whether the user is logged in or not
  const [email, setEmail] = useState(sessionStorage.getItem("email"));
  const [localId, setlocalId] = useState(sessionStorage.getItem("localId"));
  const [justSignedUp, setJustSignedUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [profile, setProfile] = useState(false);
  const [investmentPage, setInvestmentPage] = useState(false);

  //incomes
  const [totalIncome, setTotalIncome] = useState(0); //total amount
  const [incomes, setIncomes] = useState([]); //object

  //expenses
  const [totalExpense, setTotalExpense] = useState(0); //total amount
  const [expenses, setExpenses] = useState([]); //object

  //balance
  const [balance, setBalance] = useState(totalIncome - totalExpense);

  const userIsLoggedIn = !!token; //get boolean value- JS trick (truthy/falsey --> true/false value)

  const loginHandler = (token, email, localId, exp) => {
    setToken(token);
    sessionStorage.setItem("token", token);
    setEmail(email);
    sessionStorage.setItem("email", email);
    setlocalId(localId);
    sessionStorage.setItem("localId", localId);
  };

  const logoutHandler = () => {
    setToken(null);
    sessionStorage.removeItem("token");
    setEmail("");
    sessionStorage.removeItem("email");
    setlocalId("");
    sessionStorage.removeItem("localId");
  };
  const totalExpenseHandler = (x) => {
    setTotalExpense(x);
    setBalance(totalIncome - totalExpense);
  };
  const totalIncomeHandler = (x) => {
    setTotalIncome(x);
    setBalance(totalIncome - totalExpense);
  };
  const incomesHandler = (x) => {
    setIncomes(x);
  };
  const expensesHandler = (x) => {
    setExpenses(x);
  };
  const setJustSignedUpHandler = (x) => {
    setJustSignedUp(true);
    setTimeout(function () {
      setJustSignedUp(false);
    }, 5000); // wait 5 seconds, then reset to false
  };
  const setErrorMessageHandler = (x) => {
    setErrorMessage(x);
    setTimeout(function () {
      setErrorMessage(false);
    }, 5000);
  };
  const setProfileHandler = (x) => {
    setProfile(x);
  };
  const setInvestmentHandler = (x) => {
    setInvestmentPage(x);
  };
  const contextValue = {
    token: token,
    email: email,
    localId: localId,
    isLoggedIn: userIsLoggedIn,
    incomes: incomes,
    expenses: expenses,
    totalIncome: totalIncome,
    totalExpense: totalExpense,
    balance: balance,
    justSignedUp: justSignedUp,
    errorMessage: errorMessage,
    profile: profile,
    investmentPage: investmentPage,
    setProfile: setProfileHandler,
    setInvestment: setInvestmentHandler,
    setErrorMessage: setErrorMessageHandler,
    setJustSignedUp: setJustSignedUpHandler,
    setIncomes: incomesHandler,
    setExpenses: expensesHandler,
    setTotalIncome: totalIncomeHandler,
    setTotalExpense: totalExpenseHandler,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <context.Provider value={contextValue}>
      {props.children}
    </context.Provider>
  );
};

export default context;
