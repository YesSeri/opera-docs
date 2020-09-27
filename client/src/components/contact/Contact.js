import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import SuccessMessage from './SuccessMessage';
import ContactForm from './ContactForm';

export default function Contact() {
  const [emailSentStatus, setEmailSentStatus] = useState(null); // Three values. Either success, failure or null. Null is before attempt has been made.

  return (
    <Container>
      <ContactForm setEmailSentStatus={setEmailSentStatus} />
      <SuccessMessage emailSentStatus={emailSentStatus} />
    </Container>
  );
}
