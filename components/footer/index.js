import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavWrapper, CloseButton } from './styled'
import NavLink from '../NavLink'

function Footer() {
	const [visible, setVisible] = useState(true);
	return (
		visible &&
		<NavWrapper>
			<Navbar
				bg="light"
				expand="sm"
			>
				<Nav className="mx-auto" style={{ display: 'block' }}>
					<NavLink href="/contact" name="Contact" />
					<NavLink href="/about" name="About" />
				</Nav>
				<CloseButton onClick={() => setVisible(false)}>
					&#10006;
				</CloseButton>
			</Navbar>
		</NavWrapper>
	);
}
export default Footer;
