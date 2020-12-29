import React from 'react';
import Container from 'react-bootstrap/Container';

export default function Contact({ success }) {
  const message = () => {
    if (success) {
      return (
        <p style={{ marginTop: '10px' }}>Message has been sent</p>
      )

    } else if (success === false) {
      return <p style={{ color: 'red', marginTop: '10px' }}>Failed to send message</p>;
    }
    else {
      return
    }
  };
  return <Container>{message()}</Container>;
}
