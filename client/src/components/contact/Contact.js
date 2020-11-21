import React, { useState } from 'react';
import ContactForm from './ContactForm';
import { Helmet } from 'react-helmet'

export default function Contact() {
  const [emailSentStatus, setEmailSentStatus] = useState(null); // Three values. Either success, failure or null. Null is before attempt has been made.

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
