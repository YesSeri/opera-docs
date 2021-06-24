import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { NavWrapper } from '../../sharedStyles'

function NavBar() {
	return (
		<NavWrapper>
			<Navbar bg="light" expand="sm">
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mx-auto">
						<NavLink exact activeClassName="active" to="/">
							Search
						</NavLink>
						<NavLink exact activeClassName="active" to="/operas">
							Operas
						</NavLink>
						<NavLink exact activeClassName="active" to="/composers">
							Composers
						</NavLink>
						<NavLink exact activeClassName="active" to="/arias">
							Arias
						</NavLink>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</NavWrapper>
	);
}

export default NavBar;
