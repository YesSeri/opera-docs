import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { NavWrapper } from '../../sharedStyles'

function Footer() {
	const [visible, setVisible] = useState(true);
	return (
		<NavWrapper>
			<Navbar
				bg="light"
				expand="sm"
				style={{ display: visible ? 'flex' : 'none' }}
			>
				<Nav className="mx-auto">
					<NavLink exact activeClassName="active" to="/contact">
						Contact
					</NavLink>
					<NavLink exact activeClassName="active" to="/about">
						About
					</NavLink>
				</Nav>
				<div className="closeFooter" onClick={() => setVisible(false)}>

					&#10006;
				</div>
			</Navbar>
		</NavWrapper>
	);
}
export default Footer;
