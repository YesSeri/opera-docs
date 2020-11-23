import React from 'react';
import ContactForm from './ContactForm';
import { Helmet } from 'react-helmet'

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>
          operadocs - Contact page
        </title>
      </Helmet>
      <h1>Contact</h1>
      <ContactForm></ContactForm>
    </>
  );
}
