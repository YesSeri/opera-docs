import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
export default function SuccessMessage({ emailSentStatus }) {
  return (
    <Row>
      <Col
        style={{
          display: (emailSentStatus === 'success' ? 'flex' : 'none'),
        }}
      >
        Your message has been sent
      </Col>
      <Col
        style={{
          display: (emailSentStatus === 'failure' ? 'flex' : 'none'),
        }}
      >
        Error. Your message has not been successfully sent. 
      </Col>
    </Row>
  );
}
