import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import { StyledNavbar } from './css/styComp';

function NavBar({ filename }) {
  return (
    <StyledNavbar>
      <Navbar bg="light" expand="sm">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Col>
              <NavLink exact activeClassName="active" to="/">
                Search
              </NavLink>
            </Col>

            <Col>
              <NavLink exact activeClassName="active" to="/operas">
                Operas
              </NavLink>
            </Col>
            <Col>
              <NavLink exact activeClassName="active" to="/composers">
                Composers
              </NavLink>
            </Col>
            <Col>
              <NavLink exact activeClassName="active" to="/arias">
                Arias
              </NavLink>
            </Col>
            <Col>
              <NavLink exact activeClassName="active" to="/about">
                About
              </NavLink>
            </Col>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </StyledNavbar>
  );
}

export default NavBar;
