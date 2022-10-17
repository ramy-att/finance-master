import { useState, useContext } from "react";
import classes from "../authentication/authentication.module.css";
import context from "../store/context";
import Link from "next/link";
function SignIn(props) {
  const signUpLink =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCRmLhkduKgXPMyxhjPHlDXwLwv8AZ4_m8";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authCtx = useContext(context);

  function emailHandler(event) {
    setEmail(event.target.value);
  }
  function passHandler(event) {
    setPassword(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
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
            throw new Error(errorM);
          });
        }
      })
      .then((data) => {
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCRmLhkduKgXPMyxhjPHlDXwLwv8AZ4_m8",
          {
            method: "POST",
            header: { "Content-Type": "application/json" },
            body: JSON.stringify({
              idToken: data.idToken,
            }),
          }
        )
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            if (res["users"][0].emailVerified == true) {
              authCtx.login(data.idToken, data.email, data.localId);
            } else {
              authCtx.setErrorMessage("Verify your email first!");
            }
          });
      })
      .catch((err) => {
        if(err.message=="EMAIL_NOT_FOUND"||err.message=="INVALID_PASSWORD"){
          authCtx.setErrorMessage("Email or Password Incorrect!");
        }
        else{
          authCtx.setErrorMessage(err.message);
        }
      });
  }
  //takeMeToSignUp
  function takeMeToSignUpHandler() {
    props.takeMeToSignUp();
  }
  function takeMeToResetPassword() {
    props.takeMeToResetPassword();
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
          <h1 className="loginTitle"> Log In! </h1>
          <br></br>
          <div className="form-group">
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
          <br></br>
          <div class="form-group">
            <label for="exampleInputPassword1" class="formSub">
              Password
            </label>
            <input
              type="password"
              onChange={passHandler}
              class="form-control emailInput"
              id="exampleInputPassword1"
              placeholder="Password"
            ></input>
          </div>
          <div className="formsubTitles">
          <Link href="../signup">
              <a className="emailSubText" style={{marginRight:'0.5rem'}}>Sign-Up instead here!</a>
            </Link>
            <Link href="../resetpassword">
              <a className="emailSubText">Forgot Password!</a>
            </Link>
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

export default SignIn;
