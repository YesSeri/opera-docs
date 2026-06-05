// import React from "react";
import { PDFObject } from "react-pdfobject";
import { Container } from './styled'

export default function Frame({ downloadLink }) {
	const fallbackLink = `<p>Your browser cannot display this PDF inline. <a href="${downloadLink}">Open the PDF</a>.</p>`
	return (
		<Container>
			<PDFObject
				url={downloadLink}
				fallbackLink={fallbackLink}
			/>
		</Container>
	);
}
