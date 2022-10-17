import { useState, useContext } from "react";
import context from "../store/context";
import classes from "../authentication/authentication.module.css";
import Link from "next/link";

function SignUp(props) {
  const signUpLink =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCRmLhkduKgXPMyxhjPHlDXwLwv8AZ4_m8";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailExists, setEmailExists] = useState(null);
  const authCtx = useContext(context);

  function createUserDB(email, id) {
    fetch(
      "https://budgetmaster-1b6a5-default-rtdb.firebaseio.com/users/" +
        id +
        ".json",
      {
        method: "PUT",
        body: JSON.stringify({
          incomes: "",
          expenses: "",
        }),
        header: {
          "Content/type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {});
  }

  function createExp(local, token, id, title) {
    const url =
      "https://budgetmaster-1b6a5-default-rtdb.firebaseio.com/users/" +
      local +
      "/expenses/" +
      id +
      ".json?auth=" +
      token;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        expenseTitle: title,
        expenseAmount: 0,
      }),
      header: { "Content/type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {});
  }

  function createStarterExpenses(local, token) {
    const data = [
      [
        "Rent/Mortgage",
        "Utilities, heat, water, electricity, phone, cable, Internet",
        "Home maintenance & improvements/condo fees",
        "Property Tax",
      ],
      [
        "Car Loan/Lease Payment",
        "Gas/Electricity",
        "Oil & Maintenance",
        "Insurance",
        "Public Transit",
        "Parking Fees",
      ],
      [
        "Groceries",
        "Clothing & Grooming",
        "Coffee, lunches & Dining Out",
        "Charity",
      ],
      ["DayCare, after-school, elder care", "Activities/Lessons"],
      ["TFSA", "RRSP", "RESP", "Workplace Savings", "HISA"],
      [
        "Glasses",
        "Dental",
        "Prescriptions/Non-Prescription",
        "Life Insurance",
        "Health insurance",
      ],
      ["Credit Card"],
    ].reverse();
    const categories = [
      "Housing",
      "Transportation",
      "Monthly Living Expenses",
      "Dependants/Children",
      "Monthly Savings",
      "Health Care",
      "Credit Cards",
    ].reverse();
    const url =
      "https://budgetmaster-1b6a5-default-rtdb.firebaseio.com/users/" +
      local +
      "/expenses.json?auth=" +
      token;
    for (let i = 0; i < categories.length; i++) {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          title: categories[i],
          expenses: [],
          categoryTotal: 0,
        }),
        header: { "Content/type": "application/json" },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          const id = res["name"];
          const arr = data[i];
          for (let a = arr.length-1; a >=0; a--) {
            createExp(local, token, id, arr[a]);
          }
        });
    }
  }
  function verifyEmail(email) {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }
  function submitHandler(event) {
    event.preventDefault();
    if (verifyEmail(email)) {
      fetch(signUpLink, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        header: {
          "Content/type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            //Show some error here!
            return res.json().then((data) => {
              let errorM = "Authentication Failed!";
              if (data && data.error && data.error.message) {
                errorM = data.error.message;
              }
              // authCtx.setErrorMessage(errorM);
            });
          }
        })
        .then((res) => {
          console.log(res);
          createStarterExpenses(res["localId"], res["idToken"]);
          fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCRmLhkduKgXPMyxhjPHlDXwLwv8AZ4_m8",
            {
              method: "POST",
              header: { "Content-Type": "application/json" },
              body: JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken: res.idToken,
              }),
            }
          )
            .then((res) => {
              if (res.ok) {
                return res.json();
              } else {
                alert("An Error Has Occured. Try again!");
              }
            })
            .then((res) => {
              authCtx.setJustSignedUp(true);
              takeMeToSignInHandler();
            });
          createUserDB(email, res.localId);
        });
    } else {
      // authCtx.setErrorMessage("Email Does Not Exist!");
    }
  }

  function emailHandler(event) {
    setEmail(event.target.value);
  }
  function passHandler(event) {
    setPassword(event.target.value);
  }
  function takeMeToSignInHandler() {
    props.takeMeToSignIn();
  }
  return (
    <>
    <div className="bgColor">
    {/* <div className={classes.titleContainer}>
        <Link href="../">
          <a className={classes.title}>Financier</a>
        </Link>
        </div> */}
      <div className=" bgColor signInPage">
        <form className="signInForm" onSubmit={submitHandler}>
          {/* <h1 className={classes.title}>Financier</h1> */}
          <h1 class="loginTitle"> Sign Up! </h1>
          <br></br>
          <div class="form-group">
            <label for="exampleInputEmail1" class="formSub">
              Email address
            </label>
            <input
              type="email"
              onChange={emailHandler}
              value={email}
              class="form-control emailInput"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            ></input>
          </div>
          <br></br>
          <div class="form-group">
            <label for="exampleInputPassword1" class="formSub">
              Password
            </label>
            <input
              type="password"
              onChange={passHandler}
              value={password}
              class="form-control emailInput"
              id="exampleInputPassword1"
              placeholder="6 Character Password"
            ></input>
          </div>
          <div>
            <div className="formsubTitles">
            <Link href="../signin">
              <a className="emailSubText" style={{marginRight:'0.5rem'}}>Sign-In instead here!</a>
            </Link>
            </div>
          </div>
          <br></br>
          <div className="submitButtonContainer">
            <button type="submit" class="btn btn-primary submitButton">
              Submit
            </button>
          </div>
        </form>
      </div>
      </div>
    </>
  );
}

export default SignUp;
