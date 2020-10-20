import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { NavLink } from 'react-router-dom';

function Footer() {
  const [visible, setVisible] = useState(true);
  const handleClick = () => {
    setVisible(false);
  };
  return (
    <div className='footerContainer'>
      <Navbar
        bg="light"
        expand="sm"
        style={{ display: visible ? 'flex' : 'none', }}
      >
        <Nav className="mx-auto">
          <Row>
            <Col>
              <NavLink exact to="/contact">
                Contact
                </NavLink>
            </Col>
            <Col>
              <NavLink exact activeClassName="active" to="/about">
                About
                </NavLink>
            </Col>
          </Row>
        </Nav>
        <div className="closeFooter" onClick={handleClick}>
          &#10006;
          </div>
      </Navbar>
    </div>
  );
}
export default Footer;
