import React, { useState, useEffect } from 'react';
import Frame from '../../frame';
import InfoContainer from './InfoContainer'
import { Helmet } from 'react-helmet'
import { getApiData } from '../../utils/utilFunctions';

function Piece(props) {
	const [data, setData] = useState(null);

	useEffect(() => {
		const { pieceIdName } = props.match.params
		const id = pieceIdName.replace(/(^\d+)(.+$)/i, '$1');
		const source = getApiData(`/api/pieces/${id}`, setData);
		return () => {
			source.cancel('Component was unmounted, axios request is cancelled.');
		};
	}, [props.match.params.pieceIdName]);


	return (
		data &&
		<div>
			<Helmet>
				<title>
					operadocs - Score for {data.title} from {data.opera}
				</title>
			</Helmet>
			<InfoContainer pieceIdName={props.match.params} data={data} setData={setData} />
			<Frame
				downloadLink={`https://singcademy.com/wp-content/uploads/pdfsToBeAccessed/${data.file_title}`}
			/>
		</div>
	);
}

export default Piece;
