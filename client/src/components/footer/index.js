import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { NavWrapper } from '../../sharedStyles'
import styled from 'styled-components'

const CloseButton = styled.div`
	padding: 0 0.8em;
	${({ theme }) => theme.smallSize('padding: 0 0.4em;')}
`


function Footer() {
	const [visible, setVisible] = useState(true);
	return (
		<NavWrapper>
			<Navbar
				bg="light"
				expand="sm"
				style={{ display: visible ? 'flex' : 'none', padding: '0.1em 0' }}
			>
				<Nav className="mx-auto" style={{ display: 'block' }}>
					<NavLink exact activeClassName="active" to="/contact">
						Contact
					</NavLink>
					<NavLink exact activeClassName="active" to="/about">
						About
					</NavLink>
				</Nav>
				<CloseButton onClick={() => setVisible(false)}>
					&#10006;
				</CloseButton>
			</Navbar>
		</NavWrapper>
	);
}
export default Footer;
