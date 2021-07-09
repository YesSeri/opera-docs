import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavWrapper, NavLink } from './styled';

function NavBar() {
	return (
		<NavWrapper>
			<Navbar bg="light" expand="sm">
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mx-auto">
						<NavLink href="/" name="Search" />
						<NavLink href="/operas" name="Operas" />
						<NavLink href="/composers" name="Composers" />
						<NavLink href="/arias" name="Arias" />
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</NavWrapper>
	);
}

export default NavBar;
