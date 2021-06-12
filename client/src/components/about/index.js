import React from 'react';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet';
import { Title } from '../../sharedStyles/styles'

export default function About() {
	return (
		<>
			<Helmet>
				<title>operadocs - about us</title>
			</Helmet>
			<Container style={{ marginTop: '10px' }}>
				<Title>About</Title>
				<p>
					This is a page where scores can be found. They have been found in a
					variety of places but what they all have in common is that the there
					is no more copyright on them. This is a page solely for scores which
					are in the public domain. Without IMSLP, this site would never have
					been possible. This page was made and is maintained by Henrik Zenkert.
					If you have any questions or remarks, please feel free to contact me
					through the contact page.
				</p>
			</Container>
		</>
	);
}
