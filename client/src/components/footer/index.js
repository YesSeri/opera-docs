import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { NavWrapper } from '../../sharedStyles'
import styled from 'styled-components/macro'


const StyledNavLink = styled(NavLink)`
	padding: 0.2em!important;
`
const CloseButton = styled.div`
	padding: 0 0.8em;
	${({ theme }) => theme.smallSize('padding: 0 0.4em;')}
`


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
					<StyledNavLink exact activeClassName="active" to="/contact">
						Contact
					</StyledNavLink>
					<StyledNavLink exact activeClassName="active" to="/about">
						About
					</StyledNavLink>
				</Nav>
				<CloseButton onClick={() => setVisible(false)}>
					&#10006;
				</CloseButton>
			</Navbar>
		</NavWrapper>
	);
}
export default Footer;
