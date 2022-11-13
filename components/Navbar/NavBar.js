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
  // const isAuth = useSelector((state) => state.auth.isAuthenticated);
  // const userEmail = useSelector((state) => state.auth.userData.email);
  const isAuth = useSelector((state) => state.isAuthenticated);
  const userEmail = useSelector((state) => state.userData.email);
  const dispatch= useDispatch();

  const signOut= () =>{
    dispatch(authActions.logout())
  }
  return (
    <Navbar collapseOnSelect className="navBar" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <Image
            src={logo}
            width="200"
            height="45"
            className="logo"
            alt="Financier Logo"
          />
        </Navbar.Brand>
        {isAuth && <Nav.Link href="/dashboard">Dashboard</Nav.Link>}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
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
