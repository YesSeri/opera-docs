import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { StyledIframe } from './css/styComp';

export default function Frame({ downloadLink }) {
  return (
    <StyledIframe>
      <Container fluid>
        <Row>
          <Col xl={{ span: 10, offset: 1 }}>
            <iframe
              src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${downloadLink}`}
            ></iframe>
          </Col>
          <Col xl={{ span: 10, offset: 1 }}>
            <object data={downloadLink} type="application/pdf"></object>
          </Col>
          <Col xl={{ span: 10, offset: 1 }}>
            <iframe
              src={downloadLink}
            ></iframe>
          </Col>
        </Row>
      </Container>
    </StyledIframe>
  );
}
