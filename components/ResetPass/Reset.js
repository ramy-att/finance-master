import { useState, useContext } from "react";
import context from "../store/context";
import classes from "../authentication/authentication.module.css";
import Link from "next/link";

export default function Reset(props) {
  const [email, setEmail] = useState("");
  const authCtx = useContext(context);

  function emailHandler(event) {
    setEmail(event.target.value);
  }
  function takeMeToSignUpHandler() {
    props.signUp();
  }
  function takeMeToSignInHandler() {
    props.signIn();
  }
  function submitHandler(event) {
    event.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCRmLhkduKgXPMyxhjPHlDXwLwv8AZ4_m8",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: email,
        }),
        header: {
          "Content/type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        authCtx.setErrorMessage("Email Sent (Check Your Junk)!");
        takeMeToSignInHandler();
      } else {
        authCtx.setErrorMessage("Email Not Found!");
      }
    });
  }
  return (
    <>
      <div className="bgColor">
          {/* <div className={classes.titleContainer}>
        <Link href="../">
          <a className={classes.title}>Financier</a>
        </Link>
        </div> */}
      <div className="bgColor signInPage">
        <form className="signInForm" onSubmit={submitHandler}>
          <h1 class="loginTitle"> Reset Password!</h1>
          <br></br>
          <div class="form-group">
            <label for="exampleInputEmail1" class="formSub">
              Email address
            </label>
            <input
              type="email"
              onChange={emailHandler}
              class="form-control emailInput"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            ></input>
          </div>
          <div>
          <div className="formsubTitles">
            <Link href="../signin">
              <a className="emailSubText" style={{marginRight:'0.5rem'}}>Sign-In instead here!</a>
            </Link>
            <Link href="../signup">
              <a className="emailSubText">Sign-Up instead here!</a>
            </Link>
            <br></br>
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
