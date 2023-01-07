import Link from "next/link";
import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useRouter } from "next/router";
import { Alert } from "react-bootstrap";

function ResetPass() {
  const emailRef = useRef(null);
  const router = useRouter();
  const [error, setError] = useState("");
  const submitHandler = async (evt) => {
    evt.preventDefault();
    const endpoint = "/api/resetpass";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current.value,
      }),
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    if (result && result.error) {
      const error = result.error;
      setError(error == "EMAIL_NOT_FOUND" ? "Email Not Found!" : error);
      setTimeout(() => {
        setError("");
      }, "5000");
    } else {
      router.push("/signin");
    }
  };
  return (
    <Container fluid>
      {error && (
        <Alert className="errorAlert" key="danger" variant="danger">
          {error}
        </Alert>
      )}
      <Row>
        <div className="signInPage">
          <div className="signInContainer">
            <Form onSubmit={submitHandler}>
              <div className="signInHeader">Reset Password!</div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  className="inputSignIn"
                  placeholder="Enter email"
                  required
                />
              </Form.Group>
              <Form.Group className="forgotPasswordContainer">
                <Form.Text className="text-muted">
                  This will send you an email. Please check your Junk.
                </Form.Text>
              </Form.Group>
              <Form.Group className="forgotPasswordContainer">
                <Link href="/signin">
                  <Form.Text className="text-muted forgotPassword signUpLink">
                    Remember Password? Sign In
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

export default ResetPass;
