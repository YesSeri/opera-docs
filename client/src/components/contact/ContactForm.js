import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import SuccessMessage from './SuccessMessage';
import emailjs from 'emailjs-com';

export default function Contact() {
	const [email, setEmail] = useState(null);
	const [name, setName] = useState(null);
	const [subject, setSubject] = useState(null);
	const [message, setMessage] = useState(null);

	const [success, setSuccess] = useState(null);

	const handleSubmit = (event) => {
		event.preventDefault();
		const templateParams = { email, name, subject, message };
		emailjs
			.send(
				process.env.REACT_APP_SERVICE_ID,
				process.env.REACT_APP_TEMPLATE_ID,
				templateParams,
				process.env.REACT_APP_USER_ID
			)
			.then((response) => {
				console.log(response);
				setSuccess(true);
			})
			.catch((error) => {
				console.log(error);
				setSuccess(false);
			});
	};
	const emailChange = (event) => setEmail(event.target.value);
	const nameChange = (event) => setName(event.target.value);
	const messageChange = (event) => setMessage(event.target.value);
	const subjectChange = (event) => setSubject(event.target.value);
	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="formEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						onChange={emailChange}
					/>
				</Form.Group>

				<Form.Group controlId="formName">
					<Form.Label>Name</Form.Label>
					<Form.Control type="text" placeholder="Name" onChange={nameChange} />
				</Form.Group>

				<Form.Group controlId="formSubject">
					<Form.Label>Subject</Form.Label>
					<Form.Control
						type="text"
						placeholder="Subject"
						onChange={subjectChange}
					/>
				</Form.Group>

				<Form.Group controlId="form.ControlTextarea">
					<Form.Label>Message</Form.Label>
					<Form.Control
						as="textarea"
						rows={7}
						placeholder="Your message"
						onChange={messageChange}
					/>
				</Form.Group>

				<Button
					variant="primary"
					type="submit"
					onClick={() => setSuccess(null)}
				>
					Submit
				</Button>
			</Form>
			<SuccessMessage success={success} />
		</Container>
	);
}
