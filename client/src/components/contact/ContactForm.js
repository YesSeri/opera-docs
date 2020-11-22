import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import SuccessMessage from './SuccessMessage'
import axios from 'axios';

export default function Contact() {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [subject, setSubject] = useState(null);
  const [text, setText] = useState(null);

  const [success, setSuccess] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/sendmail', {email, name, subject, text})
      .then(response => {
        console.log(response);
        setSuccess(true)
      })
      .catch(error => {
        console.log(error);
        setSuccess(false)
      });
  }
  const emailChange = (event) => {
    setEmail(event.target.value)
  }
  const nameChange = (event) => {
    setName(event.target.value)
  }
  const textChange = (event) => {
    setText(event.target.value)
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

        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" onChange={nameChange} />
        </Form.Group>

        <Form.Group controlId="formSubject">
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text" placeholder="Subject" onChange={subjectChange} />
        </Form.Group>

        <Form.Group controlId="form.ControlTextarea">
          <Form.Label>Text</Form.Label>
          <Form.Control as="textarea" rows={7} placeholder='Your text' onChange={textChange} />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={() => setSuccess(null)}>
          Submit
        </Button>
      </Form>
      <SuccessMessage success={success}/>
    </Container>
  );
}
