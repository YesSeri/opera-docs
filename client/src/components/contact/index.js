import React from 'react';
import ContactForm from './ContactForm';
import { Helmet } from 'react-helmet';
import styled from 'styled-components/macro'

const Title = styled.h1`
	text-align: center;
`
export default function Contact() {
	return (
		<>
			<Helmet>
				<title>operadocs - Contact page</title>
			</Helmet>
			<Title>Contact</Title>
			<ContactForm />
		</>
	);
}
