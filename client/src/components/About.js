import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
export default function About() {
  return (
    <>
      <h1>About</h1>

      <Container>
        <Col>
          This is a page where scores can be found. They have been found in a
          variety of places but what they all have in common is that the there
          is no more copyright on them. This is a page solely for scores which
          are in the public domain. Without IMSLP, this site would never have
          been possible. This page was made and is maintained by Henrik Zenkert.
          If you have any questions or remarks, please feel free to contact me.
        </Col>
      </Container>
    </>
  );
}
