import React, { useState, useEffect } from 'react';
import { createPieceUrl, getApiData } from '../../utils/utilFunctions';
import { Helmet } from 'react-helmet';
import { ResultPane, ResultsContainer, Link, Title } from './styled'

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

	const OperaPiece = () => {
		return data.map(
			({ last_name, opera_id, name, title, id, type }) => {
				const pieceUrl = createPieceUrl(last_name, opera_id, name, id, title);
				const weight =
					type === 'recitativo' || type === 'choir' || type === 'intermezzo' || type === 'other'
						? 'normal'
						: 'bold';
				return (
					<ResultPane key={id} style={{ width: '100%' }}>
						<Link
							style={{ fontWeight: weight }}
							href={`${pieceUrl}`}
						>{`${title}`}</Link>
						<br />
					</ResultPane>
				);
			}
		)
	};
	return (
		<div>
			<Helmet>
				<title>operadocs - Vocal scores for {opera}</title>
			</Helmet>
			{data &&
				<div>
					<Title>{opera}</Title>
					<ResultsContainer>
						<OperaPiece />
					</ResultsContainer>
				</div>
			}
		</div>
	);
}

export default Opera;
