import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet';
import { createOperaUrl, getApiData } from '../../utils/utilFunctions';
import { ResultPane, ResultsContainer } from './styled'

function Operas() {
	const [data, setData] = useState(null);
	useEffect(() => {
		const source = getApiData(`/api/operas/`, setData); // Return is an axios cancel token. Used if component gets unmounted before request is completed.
		return () => {
			source.cancel('Component was unmounted, axios request is cancelled.');
		};
	}, []);

	const operaPieces = () => {
		return data.map(({ last_name, opera_id, opera }) => {
			const url = createOperaUrl(last_name, opera_id, opera);
			return (
				<ResultPane style={{}} key={opera_id}>
					<Nav.Link href={url}>{`${opera}`}</Nav.Link>
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
				{data ? operaPieces() : null}
			</ResultsContainer>
		</>
	);
}

export default Operas;
