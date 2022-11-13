import { useState, useRef } from "react";
import { authActions } from "../store";
import { useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Link from "next/link";
function SignIn() {
  const email = useRef();
  const password = useRef();
  const [error, setError] = useState("");

  // Redux dispatch
  const dispatch= useDispatch();

  const submitHandler = async (evt) => {
    evt.preventDefault();
    const data = {
      email: email.current.value,
      password: password.current.value,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/sign-in";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    if (result && result.error) {
      const error = result.error;
      console.log(error);
    } else {
      // Save user data - redux
      dispatch(authActions.login(result))
    }
    email.current.value = "";
    password.current.value = "";
  };
  return (
    <Container fluid>
      <Row>
        <div className="signInPage">
          <div className="signInContainer">
            <Form onSubmit={submitHandler}>
              <div className="signInHeader">Sign In!</div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  ref={email}
                  type="email"
                  className="inputSignIn"
                  placeholder="Enter email"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  ref={password}
                  className="inputSignIn"
                  type="password"
                  placeholder="Password"
                  required
                />
              </Form.Group>
              <Form.Group className="forgotPasswordContainer">
                <Link href="/resetpassword">
                  <Form.Text className="text-muted forgotPassword">
                    Forgot Password
                  </Form.Text>
                </Link>
              </Form.Group>
              <div className="buttonContainer">
                <Button className="submitButton" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default SignIn;
