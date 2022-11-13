import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Image from "next/image";
import logo from "../pictures/LogoWBg.png";
import Link from "next/link";
export const Footer = () => {
  return (
    <div className="footer">
      <Container>
        <Row>
          <Col lg={4}>
            <div className="footerCol">
              <Link href="/">
                <Image
                  src={logo}
                  width="250"
                  height="60"
                  className="logo"
                  alt="Financier Logo"
                />
              </Link>
              <div>
                <span className="slogan">Save. Invest. Enjoy</span>
                <p className="footerLeft">
                  <span className="copyRight">© Copyright 2022</span>
                  <a href="https://www.linkedin.com/in/ramy-attalla/">
                    Creation of Ramy Attalla
                  </a>
                </p>
              </div>
            </div>
          </Col>
          <Col lg={4}>
            <div className="footerCol">
              <h1>Navigation</h1>
              <div className="footerSection">
                <a href="">Sign Up</a>
                <br />
                <a href="">Sign In</a>
                <br />
                <a href="">About Us</a>
              </div>
            </div>
          </Col>
          <Col lg={4}>
            <div className="footerCol">
              <h1>Resources</h1>
              <div className="footerSection">
                <a href="https://www.investopedia.com/articles/basics/11/3-s-simple-investing.asp">
                  Types of Investments
                </a>
                <br />
                <a href="https://www.investopedia.com/terms/i/inflation.asp">
                  Inflation
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
