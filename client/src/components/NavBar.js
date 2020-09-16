import React from 'react';
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { StyledLinks } from './css/styComp';
function NavBar({ filename }) {
  return (
    <Navbar bg="light" expand="lg">
      {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/operas">Operas</Nav.Link>
          <Nav.Link href="/composers">Composers</Nav.Link>
          <Nav.Link href="/pieces">Pieces</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    // <StyledLinks>
    //   <nav>
    //     <Link to="/">Home</Link>
    //     <span> | </span>
    //     <Link to="/operas">Operas</Link>
    //     <span> | </span>
    //     <Link to="/composers">Composers</Link>
    //     <span> | </span>
    //     <Link to="/pieces">Pieces</Link>
    //     <span> | </span>
    //     <Link to="/about">About</Link>
    //   </nav>
    // </StyledLinks>
  );
}

export default NavBar;
