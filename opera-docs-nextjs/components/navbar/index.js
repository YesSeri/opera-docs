import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavWrapper, Link } from './styled';
import { useRouter } from "next/router";


function NavBar() {

	const router = useRouter();
	const { pathname } = router
	console.log(pathname)
	return (
		<NavWrapper>
			<Navbar bg="light" expand="sm">
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mx-auto">
						<Link href="/" active={pathname==='/'}>
							Search
						</Link>
						<Link href="/operas">
							Operas
						</Link>
						<Link href="/composers">
							Composers
						</Link>
						{/* <Link href="/arias">
							Arias
						</Link> */}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</NavWrapper>
	);
}

export default NavBar;
