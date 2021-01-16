import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./frame.css";
import { PDFObject } from "react-pdfobject";

export default function Frame({ downloadLink }) {
	return (
		<div className="iframeContainer">
			<Container fluid>
				<Row>
					<Col xl={{ span: 10, offset: 1 }}>
						<PDFObject
							url={downloadLink}
							fallbackLink={`<iframe class="fallbackIframe" src=https://docs.google.com/gview?url=${downloadLink}&embedded=true></iframe>`}
						/>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
