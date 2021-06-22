import React, { useState, useEffect } from 'react';
import Frame from '../../frame';
import { getApiData } from '../../utils/utilFunctions';
import Links from './Links'
import Synopsis from './Synopsis';
import Info from './Info';
import { Title } from './styled'
import { Helmet } from 'react-helmet'

function Piece(props) {
	const [data, setData] = useState(null);
	useEffect(() => {
		const { pieceIdName } = props.match.params;
		const id = pieceIdName.replace(/(^\d+)(.+$)/i, '$1');
		const source = getApiData(`/api/pieces/${id}`, setData);
		return () => {
			source.cancel('Component was unmounted, axios request is cancelled.');
		};
	}, [props.match.params]);
	return (data &&
		<div>
			<Helmet>
				<title>
					operadocs - Score for {data.title} from {data.opera}
				</title>
			</Helmet>
			<Title>{data.title}</Title>
			<Synopsis description={data.description} />
			<Links id={data.id} />
			<Info data={data} />
			<Frame
				downloadLink={`https://singcademy.com/wp-content/uploads/pdfsToBeAccessed/${data.file_title}`}
			/>
		</div>
	);
}

export default Piece;
