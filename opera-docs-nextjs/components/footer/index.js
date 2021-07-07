import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import { NavWrapper, CloseButton } from './styled'

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
					<Link href="/contact">
						Contact
					</Link>
					<Link href="/about">
						About
					</Link>
				</Nav>
				<CloseButton onClick={() => setVisible(false)}>
					&#10006;
				</CloseButton>
			</Navbar>
		</NavWrapper>
	);
}
export default Footer;
