import { useState, useContext, useRef } from "react";
import NavBar from "../Navbar/NavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Alert } from "react-bootstrap";
import Link from "next/link";
function SignUp() {
  const email = useRef();
  const password = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submitHandler = async (evt) => {
    evt.preventDefault();
    const data = {
      email: email.current.value,
      password: password.current.value,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/sign-up";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    // alert(`Account created for: ${result.data}`);
    if (result && result.error) {
      const error = result.error;
      if (error === "EMAIL_EXISTS") {
        setError("User Exists! Sign In Instead");
      } else {
        setError(error);
      }
      setTimeout(() => {
        setError("");
      }, "5000");
    } else {
      setSuccess("Account Created! Verify Your Email Before Signing In!");
      setTimeout(() => {
        setSuccess("");
      }, "5000");
    }
    email.current.value = "";
    password.current.value = "";
  };

  return (
    <Container fluid>
      <Row>
        {error && (
          <Alert className="errorAlert" key="danger" variant="danger">
            {error}
          </Alert>
        )}
        {success && (
          <Alert className="errorAlert" key="success" variant="success">
            {success}
          </Alert>
        )}
        <div className="signInPage">
          <div className="signInContainer">
            {/* <Form action="/api/sign-up" method="post"> */}
            <Form onSubmit={submitHandler}>
              <div className="signInHeader">Sign Up!</div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  ref={email}
                  type="email"
                  name="email"
                  className="inputSignIn"
                  placeholder="Enter email"
                  required
                />
                <Form.Text className="text-muted">
                  We&apos;ll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  ref={password}
                  className="inputSignIn"
                  name="password"
                  type="password"
                  placeholder="6 Character Password"
                  required
                />
              </Form.Group>
              <Form.Group className="forgotPasswordContainer">
                <Link href="/signin">
                  <Form.Text className="text-muted forgotPassword signUpLink">
                    Sign In
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

export default SignUp;
