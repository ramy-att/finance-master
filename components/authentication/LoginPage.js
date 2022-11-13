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
    </Container>
  );
}
