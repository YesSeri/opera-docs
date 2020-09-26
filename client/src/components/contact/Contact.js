import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import SuccessMessage from './SuccessMessage';
import ContactForm from './ContactForm';

export default function Contact() {
  const [emailSent, setEmailSent] = useState(false);

  return (
    <Container>
      <ContactForm setEmailSent={setEmailSent} />
      <SuccessMessage emailSent={emailSent} />
    </Container>
  );
}
