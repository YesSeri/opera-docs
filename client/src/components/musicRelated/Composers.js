import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import { Helmet } from 'react-helmet';
import { createComposerUrl } from '../helper/HelperFunctions';
import { getApiData } from '../helper/HelperFunctions';

function Composers() {
	const [data, setData] = useState(null);

	useEffect(() => {
		const source = getApiData(`/api/composers/`, setData); // Source is an axios cancel token. Used if component gets unmounted before request is completed.
		return () => {
			source.cancel('Component was unmounted, axios request is cancelled.');
		};
	}, []);

	const renderComposers = () => {
		if (data) {
			return data.map(({ id, last_name, first_name }) => {
				const url = createComposerUrl(last_name);
				console.log(url)
				return (
					<Row key={id}>
						<Col md={{ span: 4, offset: 4 }}>
							<Nav.Link href={url}>{`${last_name}, ${first_name}`}</Nav.Link>
						</Col>
					</Row>
				);
			});
		}
	};

	return (
		<>
			<Helmet>
				<title>operadocs - A list of all available composers</title>
			</Helmet>
			<Container className="musicContainer">{renderComposers()}</Container>
		</>
	);
}

export default Composers;
