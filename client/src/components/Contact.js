import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import axios from 'axios';
export default function Contact() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleEmailChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const handleSubjectChange = (e) => {
    console.log(e.target.value);
    setSubject(e.target.value);
  };
  const handleTextChange = (e) => {
    console.log(e.target.value);
    setText(e.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: 'POST',
      url: 'http://localhost:5000/sendmail',
      data: {
        email,
        subject,
        text,
      },
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        console.log('Message Sent.');
        setEmailSent(true);
      } else {
        console.log('Message failed to send.');
      }
    });
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row xs={1} md={2}>
          <Col>
            <Form.Group controlId="emailInput">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="your@email.com"
                onChange={handleEmailChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="subjectInput">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Subject"
                onChange={handleSubjectChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row md={1}>
          <Col>
            <Form.Group controlId="textAreaInput">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                onChange={handleTextChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Row>
        <Col
          style={{
            display: emailSent ? 'flex' : 'none',
          }}
        >
          Your message has been sent
        </Col>
      </Row>
    </Container>
  );
}
