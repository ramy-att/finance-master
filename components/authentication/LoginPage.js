import NavBar from "../Navbar/NavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Image from "next/image";
import c1 from "../pictures/1.png";
import c2 from "../pictures/2.png";
import { LandingPageE1 } from "./LandingPageE1";
import { LandingPageE2 } from "./LandingPageE2";
import { LandingPageE3 } from "./LandingPageE3";
import { Accordion } from "react-bootstrap";
// import { Footer } from "../Footer/Footer";

export default function LogInPage() {
  return (
    <Container classname="HomePage" fluid>
      <Row>
        <div className="carouselRow">
          <Carousel controls={false} indicators={false} class="homeCarousel">
            <Carousel.Item>
              <Image
                className="d-block w-100"
                src={c1}
                alt="First slide"
                width="1000px"
                height="600px"
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                className="d-block w-100"
                src={c2}
                alt="Second slide"
                width="1000px"
                height="600px"
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </Row>
      <div className="LandingPageElements">
        <Row>
          <Col md={4}>
            <LandingPageE1 />
          </Col>
          <Col md={4}>
            <LandingPageE2 />
          </Col>
          <Col md={4}>
            <LandingPageE3 />
          </Col>
        </Row>
        <Row>
          <Accordion className="Accordion">
            <Accordion.Item eventKey="0">
              <Accordion.Header>50 20 20 Budget Rule</Accordion.Header>
              <Accordion.Body>
                The 50/30/20 budgeting rule by US Senator Elizabeth Warren
                divides your after-tax income into three categories: 50% for
                needs, 30% for wants, and 20% for savings. Your “needs” include
                obligatory expenses like rent or mortgage payments. Your “wants”
                are your basic pleasures of life. You should allocate the last
                20% towards setting up an emergency fund, or paying down any
                high-interest debt. To begin with the 50/30/20 budget, calculate
                your after-tax income on average. Then take a look at your
                spending habits to categorize your expenditures. Next, identify
                easy, low-hanging opportunities to save. Remember that the
                50/30/20 number is a guideline, and you can (and should) tweak
                them according to your own financial goals.
                <a href="https://www.koho.ca/learn/what-is-the-fifty-thirty-twenty-budgeting-rule/">
                  Source
                </a>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                Types of Investments in Canada
              </Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>What is Inflation</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                Why Should I Create a Financier Account
              </Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
      </div>
    </Container>
  );
}
