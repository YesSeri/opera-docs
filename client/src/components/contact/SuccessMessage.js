
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
export default function SuccessMessage({emailSent}) {
  return (
    <Row>
      <Col
        style={{
          display: emailSent ? 'flex' : 'none',
        }}
      >
        Your message has been sent
      </Col>
    </Row>
  );
}
