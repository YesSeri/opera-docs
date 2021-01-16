import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./frame.css";
const Spinner = require("react-spinkit");

export default function Frame({ downloadLink }) {
	const [loading, setLoading] = useState(true);

	function createIframe() {
		return {
			__html: `<iframe 
				src="https://docs.google.com/gview?url=${downloadLink}&embedded=true"
				frameborder="0" 
				iframe.onload = () => { console.log("myframe is loaded"); 
				style="height: 100vh; width: 100%;">
			</iframe>`,
		};
	}
	function MyDangerousIframe() {
		return <div dangerouslySetInnerHTML={createIframe()} />;
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
						<MyDangerousIframe />
					</Col>
				</Row>
			</Container>
		</div>
	);
}
