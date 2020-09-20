import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { StyledBanner } from './css/styComp';
const topText = `The Platform for finding opera sheet music online`;
const leftText = `Search for the opera, composer or song you want to find.`;
const rightText = `Alternatively, find your scores by choosing a specific composer or opera.`;
export default function Banner() {
  return (
    <StyledBanner>
      <Container fluid className="bannerContainer">
        <Row className="topRow">
          <Col className="centered">
            {topText}

          </Col>
        </Row>
        <Row className="align-items-center bottomRow centered">
          <Col md={6}>
            {leftText}
          </Col>
          <Col md={6}>

            {rightText}
          </Col>
        </Row>
      </Container>
    </StyledBanner>
  );
}
