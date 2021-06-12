import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Helmet } from 'react-helmet';
import { createComposerUrl, getApiData } from '../../utils/utilFunctions';
import { ResultPane, ResultsContainer } from './styled'

function Composers() {
	const [data, setData] = useState(null);

	useEffect(() => {
		const source = getApiData(`/api/composers/`, setData); // Source is an axios cancel token. Used if component gets unmounted before request is completed.
		return () => {
			source.cancel('Component was unmounted, axios request is cancelled.');
		};
	}, []);

	const Composers = () => {
		if (data) {
			return data.map(({ id, last_name, first_name }) => {
				const url = createComposerUrl(last_name);
				return (
					<ResultPane key={id}>
						<Nav.Link href={url}>{`${last_name}, ${first_name}`}</Nav.Link>
					</ResultPane>
				);
			});
		} else {
			return <div />
		}
	};

	return (
		<>
			<Helmet>
				<title>operadocs - A list of all available composers</title>
			</Helmet>
			<Container className="musicContainer">
				<ResultsContainer>
					<Composers></Composers>
				</ResultsContainer>
			</Container>
		</>
	);
}

export default Composers;
