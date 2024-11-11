import React from 'react';
import Frame from '../frame';
import InfoContainer from './InfoContainer'

const url = "/pdfs"
function Piece({ data }) {

	return (
		<>
			<InfoContainer data={data} />
			<Frame
				downloadLink={`${url}/${data.file_title}`}
			/>
		</>
	);
}

export default Piece;
