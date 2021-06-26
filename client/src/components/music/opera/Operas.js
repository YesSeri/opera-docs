import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { createOperaUrl, getApiData } from '../../utils/utilFunctions';
import { ResultPane, ResultsContainer, Link } from './styled'

function Operas() {
	const [data, setData] = useState(null);
	useEffect(() => {
		const source = getApiData(`/api/operas/`, setData); // Return is an axios cancel token. Used if component gets unmounted before request is completed.
		return () => {
			source.cancel('Component was unmounted, axios request is cancelled.');
		};
	}, []);

	const OperaPieces = () => {
		return data.map(({ last_name, opera_id, opera }) => {
			const url = createOperaUrl(last_name, opera_id, opera);
			return (
				<ResultPane key={opera_id}>
					<Link href={url}>{`${opera}`}</Link>
				</ResultPane>
			);
		});
	};
	return (
		<>
			<Helmet>
				<title>operadocs - Operas and Scores</title>
			</Helmet>
			<ResultsContainer>
				{data && <OperaPieces />}
			</ResultsContainer>
		</>
	);
}

export default Operas;
