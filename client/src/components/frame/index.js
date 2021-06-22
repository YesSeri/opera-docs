import React from "react";
import { PDFObject } from "react-pdfobject";
import { Container } from './styled'

export default function Frame({ downloadLink }) {
	const fallbackLink = `<iframe class="fallbackIframe" src=https://docs.google.com/gview?url=${downloadLink}&embedded=true></iframe>`
	return (
		<Container>
			<PDFObject
				url={downloadLink}
				fallbackLink={fallbackLink}
			/>
		</Container>
	);
}
