import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import axios from 'axios';

export default function Contact() {
  const [email, setEmail] = useState(null);
  const [subject, setSubject] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/sendmail', {email, subject, message})
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
  const emailChange = (event) => {
    setEmail(event.target.value)
  }
  const messageChange = (event) => {
    setMessage(event.target.value)
  }
  const subjectChange = (event) => {
    setSubject(event.target.value)
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={emailChange} />
        </Form.Group>

        <Form.Group controlId="formSubject">
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text" placeholder="Subject" onChange={subjectChange} />
        </Form.Group>

        <Form.Group controlId="form.ControlTextarea">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={7} placeholder='Your message' onChange={messageChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
