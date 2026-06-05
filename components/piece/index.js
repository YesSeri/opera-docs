import React from 'react';
import Frame from '../frame';
import InfoContainer from './InfoContainer'

const url = "/pdfs"
const createPdfUrl = (fileTitle) => `${url}/${fileTitle.split('/').map(encodeURIComponent).join('/')}`;

function Piece({ data }) {
	const pdfUrl = createPdfUrl(data.file_title);

	return (
		<>
			<InfoContainer data={data} />
			<Frame
				downloadLink={pdfUrl}
			/>
		</>
	);
}

export default Piece;
