import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./frame.css";
const Spinner = require("react-spinkit");

export default function Frame({ downloadLink }) {
	const [loading, setLoading] = useState(true);

	function createMarkup() {
		return {
			__html: `<iframe 
				src="${downloadLink}"  
				frameborder="0" 
				iframe.onload = () => { console.log("myframe is loaded"); 
				style="height: 100vh; width: 100%;">
			</iframe>`,
		};
	}
	function MyComponent() {
		return <div dangerouslySetInnerHTML={createMarkup()} />;
	}
	return (
		<div className="iframeContainer">
			<Container fluid>
				<Row
					style={{ visibility: loading ? "visible" : "hidden" }}
					className="justify-content-center"
				>
					{/* <Spinner name="double-bounce" /> */}
				</Row>
				<Row>
					<Col className="frameContainer" xl={{ span: 10, offset: 1 }}>
						<MyComponent />
					</Col>
				</Row>
			</Container>
		</div>
	);
}
