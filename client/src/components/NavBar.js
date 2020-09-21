import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Composers from './musicRelated/Composers';
import Composer from './musicRelated/Composer';
import Operas from './musicRelated/Operas';
import Opera from './musicRelated/Opera';
import Arias from './musicRelated/Arias';
import Piece from './musicRelated/Piece';
import About from './About';
import Search from './search/Search';
import { Switch, Route } from 'react-router-dom';
import { StyledNavbar } from './css/styComp';

function NavBar({ filename }) {
  return (
    <>
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
      <Switch>
        <Route path="/about" exact component={About} />
        <Route path="/composers/" exact component={Composers} />
        <Route path="/arias/" exact component={Arias} />
        <Route path="/operas/" exact component={Operas} />
        <Route path="/:lastName/:operaId/:pieceIdName" component={Piece} />
        <Route path="/:lastName/:operaIdName" component={Opera} />
        <Route path="/:lastName/" component={Composer} />
        <Route exact path="/" component={Search}></Route>
      </Switch>
    </>
  );
}

export default NavBar;
