import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
	createPieceUrl,
	createComposerUrl,
	createOperaUrl,
	getApiData,
} from '../../utils/utilFunctions';
import { Container, ResultPane, ResultsContainer, Link } from './styled'

function Arias() {
	const [data, setData] = useState(null);

	useEffect(() => {
		const source = getApiData(`/api/pieces/arias`, setData); // Return is an axios cancel token. Used if component gets unmounted before request is completed.
		return () => {
			source.cancel('Component was unmounted, axios request is cancelled.');
		};
	}, []);

	const AriasInfo = () => {
		//p.id title o.id opera c.id c.lastname, c.firstname
		const arias = data.map(
			({ piece_id, title, opera_id, opera, last_name, first_name }) => {
				const composerUrl = createComposerUrl(last_name);
				const operaUrl = createOperaUrl(last_name, opera_id, opera);
				const pieceUrl = createPieceUrl(
					last_name,
					opera_id,
					opera,
					piece_id,
					title
				);

				return (
					<ResultPane key={piece_id}>
						<Link href={pieceUrl}>{title}</Link>
						<Link href={operaUrl}>{opera}</Link>
						{/* <Item href={operaUrl}>{voice_type ? voice_type : 'Singer'}</Item> */}
						<Link
							href={composerUrl}
						>{`${last_name}, ${first_name}`}</Link>
					</ResultPane>
				)
			}
		);
		return arias;
	};
	return (
		<div className="musicContainer">
			<Helmet>
				<title>operadocs - All arias available for download</title>
			</Helmet>
			<Container>
				{data ?
					<ResultsContainer>
						<AriasInfo />
					</ResultsContainer>
					: null}
			</Container>
		</div>
	);
}

export default Arias;
