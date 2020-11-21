import React from 'react';
import Container from 'react-bootstrap/Container';

export default function Contact({ success }) {
  const message = () => {
    if (success) {
      return <p>Message has been sent</p>;
    } else if (success === false) {
      return <p style={{ color: 'red' }}>Failed to send message</p>;
    }
  };
  return <Container>{message()}</Container>;
}
