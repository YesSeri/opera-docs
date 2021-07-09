import React from 'react';
import ContactForm from './ContactForm';
import { Helmet } from 'react-helmet';
import { Title } from '../../sharedStyles'

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
