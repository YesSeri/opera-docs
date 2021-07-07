import React from 'react';
import Link from 'next/link';
import { Image, MusicContainer, ResultPane, ResultsContainer } from './styled'


const ComposerInfo = ({ data }) => {
	const { last_name, first_name } = data[0];
	const uniqName = last_name.replace(/\s/g, '').toLowerCase();
	return (
		<>
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

const urlCreator = (id) => "/operas/" + id
const ComposerOperas = ({ data }) => {
	const operas = data.map(({ last_name, opera_id, opera }) => {
		const url = urlCreator(opera_id);

		return (
			<ResultPane key={opera_id}>
				<Link href={url}>{opera}</Link>
			</ResultPane>
		);
	});
	return (
		<ResultsContainer style={{ paddingTop: '0.5em', justifyContent: 'center' }}>
			{operas}
		</ResultsContainer>);
};

function Composer({ data }) {

	return (
		<MusicContainer>
			<ComposerInfo data={data} />
			<ComposerOperas data={data} />
		</MusicContainer>
	);
}

export default Composer;
