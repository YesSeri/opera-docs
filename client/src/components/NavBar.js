import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { StyledNavbar } from './css/styComp';

function NavBar({ filename }) {
  return (
    <StyledNavbar>
      <Navbar bg="light" expand="sm">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <NavLink exact activeClassName="active" to="/">
              <Nav.Link href="/">Search</Nav.Link>
            </NavLink>
            <NavLink exact activeClassName="active" to="/operas">
              <Nav.Link href="/operas">Operas</Nav.Link>
            </NavLink>
            <NavLink exact activeClassName="active" to="/composers">
              <Nav.Link href="/composers">Composers</Nav.Link>
            </NavLink>
            <NavLink exact activeClassName="active" to="/arias">
              <Nav.Link href="/arias">Arias</Nav.Link>
            </NavLink>
            <NavLink exact activeClassName="active" to="/about">
              <Nav.Link href="/about">About</Nav.Link>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </StyledNavbar>
  );
}

export default NavBar;
