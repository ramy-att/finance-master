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
    router.push("/")
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
              <Nav.Link as={Link} href="/dashboard">
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} href="/myBudget">
                Budget
              </Nav.Link>
              <Nav.Link as={Link} href="/myAccounts">
                Accounts
              </Nav.Link>
              <Nav.Link as={Link} href="/myInvestments">
                Investments
              </Nav.Link>
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
              <Nav.Link as={Link} href="/interestCalculator">
                Interest Calculator
              </Nav.Link>
              <Nav.Link as={Link} href="/loanCalculator">
                Loan Calculator
              </Nav.Link>
            </Nav>
          )}
          {!isAuth && (
            <Nav>
              <Nav.Link as={Link} href="/signin">
                Sign In
              </Nav.Link>
              <Nav.Link as={Link} eventKey={2} href="/signup">
                Sign Up
              </Nav.Link>
            </Nav>
          )}
          {isAuth && (
            <Nav>
              <Nav.Link as={Link} href="">
                {userEmail}
              </Nav.Link>
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
