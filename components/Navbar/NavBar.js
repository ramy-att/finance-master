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

const NavBar = () => {
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
  };
  return (
    <Navbar collapseOnSelect className="navBar" expand="lg" variant="dark">
      <Container fluid >
        <Navbar.Brand href="/">
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
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/myBudget">Budget</Nav.Link>
              <Nav.Link href="/myAccounts">Accounts</Nav.Link>
              <Nav.Link href="/myInvestments">Investments</Nav.Link>
              <NavDropdown
                title="Tools"
                show={show}
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/interestCalculator">
                  Interest Calculator
                </NavDropdown.Item>
                <NavDropdown.Item href="/loanCalculator">
                  Car/Home Loan Calculator
                </NavDropdown.Item>
                <NavDropdown.Item href="/currencyConverter">
                  Currency Converter
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
          {!isAuth && (
            <Nav className="me-auto">
              <Nav.Link href="/interestCalculator">
                Interest Calculator
              </Nav.Link>
              <Nav.Link href="/loanCalculator">Loan Calculator</Nav.Link>
              <Nav.Link href="/currencyConverter">Currency Converter</Nav.Link>
            </Nav>
          )}
          {!isAuth && (
            <Nav>
              <Nav.Link href="/signin">Sign In</Nav.Link>
              <Nav.Link eventKey={2} href="/signup">
                Sign Up
              </Nav.Link>
            </Nav>
          )}
          {isAuth && (
            <Nav>
              <Nav.Link href="">{userEmail}</Nav.Link>
              <Nav.Link eventKey={2} href="/" onClick={signOut}>
                Sign Out
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBar;
