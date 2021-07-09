import React from 'react';
import Frame from '../frame';
import InfoContainer from './InfoContainer'
import Head from 'next/head'

function Piece({ data }) {

	return (
		<div>
			<Head>
				<title>
					operadocs - Score for {data.title} from {data.opera}
				</title>
			</Head>
			<InfoContainer data={data} />
			<Frame
				downloadLink={`https://singcademy.com/wp-content/uploads/pdfsToBeAccessed/${data.file_title}`}
			/>
		</div>
	);
}

export default Piece;
