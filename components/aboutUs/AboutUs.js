import { Container } from "react-bootstrap";
const AboutUs = () => {
  return (
    <Container fluid className="aboutUs">
      <div>
        <h1 className="aboutUsHeader"> About Us </h1>
        <div>
          Financier is a website dedicated to giving users the opportunity to
          save and invest money for free. By creating a Financier account, you
          receive full access to all our features, including budget-making and
          investment-tracking, for free. Both users and vistors have access to
          our other tools, including our interest-calculator, loan calculator,
          and tips on budgeting and investing.
        </div>
        <br></br>
        <h1 className="aboutUsHeader">Important Information and Notices</h1>
        <div>
          No unnecessary data is collected from any user, as such only your
          email and a password are required to create an account.
        </div>
        <div>
          Make sure to never enter bank account information anywhere on this
          website, and never share your login information with anyone
        </div>
      </div>
    </Container>
  );
};

export default AboutUs;
