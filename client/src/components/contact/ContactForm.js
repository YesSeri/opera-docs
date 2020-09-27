import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

export default function Contact({ setEmailSentStatus }) { // All the logic for sending email is here. If succesfully sent, then send true to SuccessMessage. 
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };
  const handleTextChange = (e) => {
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
      if (response.status === 200) {
        setEmailSentStatus('success');
      } else {
        setEmailSentStatus('failure')
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
    </Container>
  );
}
