import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import logo from "../pictures/LogoWBg.png";
import { BoxArrowUpRight } from "react-bootstrap-icons";

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
                  <a
                    rel="noreferrer"
                    href="https://www.linkedin.com/in/ramy-attalla/"
                    target="_blank"
                  >
                    Creation of Ramy Attalla
                    <BoxArrowUpRight
                      style={{ marginBottom: "5px", marginLeft: "5px" }}
                      size={15}
                    />
                  </a>
                </p>
              </div>
            </div>
          </Col>
          <Col lg={4}>
            <div className="footerCol">
              <h1>Navigation</h1>
              <div className="footerSection">
                <Link href="/about-us">
                  <a target="_blank">
                    About Us and Our Policies{" "}
                    <BoxArrowUpRight
                      style={{ marginBottom: "5px", marginLeft: "5px" }}
                      size={15}
                    />
                  </a>
                </Link>
                <br />
                <Link href="/signin">Sign In</Link>
                <br />
                <Link href="/signup">Sign Up</Link>
              </div>
            </div>
          </Col>
          <Col lg={4}>
            <div className="footerCol">
              <h1>Resources</h1>
              <div className="footerSection">
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://www.canada.ca/en/financial-consumer-agency/services/savings-investments/investing-basics.html#toc0"
                >
                  Types of Investments
                  <BoxArrowUpRight
                    style={{ marginBottom: "5px", marginLeft: "5px" }}
                    size={15}
                  />
                </a>
                <br />
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://www.koho.ca/learn/what-is-the-fifty-thirty-twenty-budgeting-rule/"
                >
                  50 30 20 Budget
                  <BoxArrowUpRight
                    style={{ marginBottom: "5px", marginLeft: "5px" }}
                    size={15}
                  />
                </a>
                <br />
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://www.investopedia.com/terms/i/inflation.asp"
                >
                  Inflation
                  <BoxArrowUpRight
                    style={{ marginBottom: "5px", marginLeft: "5px" }}
                    size={15}
                  />
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
