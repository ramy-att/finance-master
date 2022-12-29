import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "next/image";
import logo from "../pictures/LogoWBg.png";
import { useSelector } from "react-redux";
import { authActions } from "../store";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";

const NavBar = () => {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = (e) => {
    setShow(false);
  };
  const isAuth = useSelector((state) => state.isAuthenticated);
  const userEmail = useSelector((state) => state.userInfo.email);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authActions.logout());
    router.push("/");
  };
  return (
    <Navbar collapseOnSelect className="navBar" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand as={Link} href="/">
          <Image
            src={logo}
            width="200"
            height="45"
            className="logo"
            alt="Financier Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {isAuth && (
            <Nav className="me-auto">
              <Link href="/dashboard">
                Dashboard
              </Link>
              <Link href="/myBudget">
                Budget
              </Link>
              <Link href="/myInvestments">
                Investments
              </Link>
              <NavDropdown
                title="Tools"
                show={show}
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
                className="navDropdown"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item as={Link} href="/interestCalculator">
                  Interest Calculator
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/loanCalculator">
                  Loan Calculator
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
          {!isAuth && (
            <Nav className="me-auto">
              <Link href="/interestCalculator">
                Interest Calculator
              </Link>
              <Link href="/loanCalculator">
                Loan Calculator
              </Link>
            </Nav>
          )}
          {!isAuth && (
            <Nav>
              <Link href="/signin">
                Sign In
              </Link>
              <Link eventKey={2} href="/signup">
                Sign Up
              </Link>
            </Nav>
          )}
          {isAuth && (
            <Nav>
              <Link href="">
                {userEmail}
              </Link>
              <Button className="signoutButton" onClick={signOut}>
                Sign Out
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBar;
