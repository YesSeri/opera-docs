import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { createOperaUrl, getApiData } from '../../utils/utilFunctions';
import { Image, MusicContainer, Link, ResultPane, ResultsContainer } from './styled'


const ComposerInfo = ({ data }) => {
	const { last_name, first_name } = data[0];
	const uniqName = last_name.replace(/\s/g, '').toLowerCase();
	return (
		<>
			<Helmet>
				<title>operadocs - Operas by {`${first_name} ${last_name}`}</title>
			</Helmet>
			<h1>
				{`${first_name} ${last_name}`}
			</h1>
			<Image
				alt={`picture of ${last_name}`}
				src={encodeURI(`https://singcademy.com/wp-content/uploads/composerPics/${uniqName}.jpeg`)}
			/>
		</>
	);
};

const ComposerOperas = ({ data }) => {
	const operas = data.map(({ last_name, opera_id, opera }) => {
		const link = createOperaUrl(last_name, opera_id, opera);
		return (
			<ResultPane>
				<Link href={link}>{opera}</Link>
			</ResultPane>
		);
	});
	return (
		<ResultsContainer style={{ paddingTop: '0.5em', justifyContent: 'center' }}>
			{operas}
		</ResultsContainer>);
};

function Composer(props) {
	const [data, setData] = useState(null);
	useEffect(() => {
		const { lastName } = props.match.params;
		const source = getApiData(`/api/composers/${lastName}`, setData); // Return is an axios cancel token. Used if component gets unmounted before request is completed.
		return () => {
			source.cancel('Component was unmounted, axios request is cancelled.');
		};
	}, [props.match.params]);

	return (
		data &&
		<MusicContainer>
			<ComposerInfo data={data} />
			<ComposerOperas data={data} />
		</MusicContainer>
	);
}

export default Composer;
