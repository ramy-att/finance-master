import { useState, useContext } from "react";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import Reset from "../ResetPass/Reset";
import classes from "./authentication.module.css";
import context from "../store/context";
import Image from "next/image";
import LinkButton from "../helpers/LinkButton";
import Link from "next/link";
export default function LogInPage() {
  const [loggin, setLoggIn] = useState(false);
  const [signup, setSignUp] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const authCtx = useContext(context);

  function signInHandler() {
    setLoggIn(true);
  }
  function signUpHandler() {
    setSignUp(true);
  }

  function takeMeToSignUp() {
    setForgotPassword(false);
    setLoggIn(false);
    setSignUp(true);
  }

  function takeMeToSignIn() {
    setForgotPassword(false);
    setLoggIn(true);
    setSignUp(false);
  }

  function takeMeToResetPassword() {
    setLoggIn(false);
    setSignUp(false);
    setForgotPassword(true);
  }
  return (
    <>
      <div className={`container-fluid ${classes.loginPage}`}>
        {authCtx.justSignedUp && (
          <div class="alert alert-warning al" role="alert">
            Please Verify Your Email To Login (Check Junk)!
          </div>
        )}
        {authCtx.errorMessage && (
          <div class="alert alert-warning al" role="alert">
            {authCtx.errorMessage}
          </div>
        )}

        <div class="row">
          <div class="col-xl-10"></div>
          <div class={`col-xl-2 text-center ${classes.myName}`}>
            <a
              href="https://www.linkedin.com/in/ramy-attalla/"
              className={classes.myName}
              target='_blank' rel="noreferrer"
            >
              Developed By Ramy Attalla
            </a>
          </div>
        </div>
        <div class="row height">
          <div class="col-xl-2"></div>
          <div class="col-xl-8 height text-center">
            <div className={classes.titles}>
              <h1 className={classes.title}>Financier</h1>
              {loggin == false && signup == false && forgotPassword == false && (
                <>
                  <h1 className={classes.subTitle}>Manage Your Finances Now!</h1>
                  <LinkButton style={{backgroundColor: 'white',}} className="signInButton">
                    <Link href="/signin">Sign-In!</Link>
                  </LinkButton>
                  <LinkButton style={{backgroundColor: '#e598d8'}}  className="signUpButton">
                    <Link href="/signup">Sign-Up!</Link>
                  </LinkButton>
                </>
              )}
            </div>
          </div>
          <div class="col-xl-2"></div>
        </div>
        <br></br>
            {/* Maybe New Logo Here! */}
      </div>
    </>
  );
}
