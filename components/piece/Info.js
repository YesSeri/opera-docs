import React from 'react'
import { Container, Item } from './styled'

const url = "/pdfs"
const createPdfUrl = (fileTitle) => `${url}/${fileTitle.split('/').map(encodeURIComponent).join('/')}`;

function Info({ type, opera, last_name, first_name, file_title }) {
	const pdfUrl = createPdfUrl(file_title);

	return (
		<Container>
			<Item>
				<b>Type: </b> {type.charAt(0).toUpperCase() + type.slice(1)}
			</Item>
			<Item>
				<b>Opera: </b>
				{opera}
			</Item>
			<Item>
				<b> Composer: </b>
				{last_name}, {first_name}
			</Item>
			<Item>
				<b> Link: </b>
				<a
					href={pdfUrl}
				>
					here
				</a>
			</Item>
		</Container>
	)
}

export default Info
