import React from 'react';
import { StyledBanner } from '../css/styComp';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
export default function Banner() {
  return (
    <StyledBanner>
      <Container fluid className="bannerContainer">
        <Row className="topRow">
          <Col className="centered">The Platform for finding opera sheet music online</Col>
        </Row>
        <Row className="align-items-center bottomRow centered">
          <Col md={6} className='columns'>Search for the opera, composer or song you want to find.</Col>
          <Col md={6} className='columns'>
            Alternatively, find your scores by choosing a specific
            composer or opera.
          </Col>
        </Row>
      </Container>
    </StyledBanner>
  );
}
