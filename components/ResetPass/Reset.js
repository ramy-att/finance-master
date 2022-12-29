import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Link from "next/link";

function ResetPass() {
  return (
    <Container fluid>
      <Row>
        <div className="signInPage">
          <div className="signInContainer">
            <Form>
              <div className="signInHeader">Reset Password!</div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
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
