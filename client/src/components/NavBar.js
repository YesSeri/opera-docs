import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import './navbarFooter.css'

function NavBar() {
  return (
    <div className='navFooterContainer topNavContainer'>
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
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    </div>
  );
}

export default NavBar;
