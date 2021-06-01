import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPieceUrl, getApiData } from '../../utils/utilFunctions';
import { Helmet } from 'react-helmet';

function Opera(props) {
	const [data, setData] = useState(null);
	const opera = data ? data[0].name : '';
	useEffect(() => {
		const { operaIdName } = props.match.params;
		const id = operaIdName.replace(/(^\d+)(.+$)/i, '$1');
		const source = getApiData(`/api/operas/${id}`, setData); // Return is an axios cancel token. Used if component gets unmounted before request is completed.
		return () => {
			source.cancel('Component was unmounted, axios request is cancelled.');
		};
	}, [props.match.params]);

	const operaPieces = () => {
		const pieces = data.map(
			({ last_name, opera_id, name, title, id, type }) => {
				const pieceUrl = createPieceUrl(last_name, opera_id, name, id, title);
				const weight =
					type === 'recitativo' || type === 'choir' || type === 'intermezzo'
						? 'normal'
						: 'bold';
				return (
					<div key={id} className="operaContainer">
						<Link
							style={{ fontWeight: weight }}
							to={`${pieceUrl}`}
						>{`${title}`}</Link>
						<br />
					</div>
				);
			}
		);
		return pieces;
	};
	return (
		<div className="musicContainer">
			<Helmet>
				<title>operadocs - Vocal scores for {opera}</title>
			</Helmet>
			{data ? <h1>{opera}</h1> : data === null ? '' : 'Nothing here'}
			{data ? operaPieces() : null}
		</div>
	);
}

export default Opera;