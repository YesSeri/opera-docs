import React from 'react';
import Frame from '../frame';
import InfoContainer from './InfoContainer'

const url = "/pdfs"
function Piece({ data }) {

	return (
		<>
			<InfoContainer data={data} />
			<Frame
				// downloadLink={`https://singcademy.com/wp-content/uploads/pdfsToBeAccessed/${data.file_title}`}
				downloadLink={`${url}/${data.file_title}`}
			/>
		</>
	);
}

export default Piece;
