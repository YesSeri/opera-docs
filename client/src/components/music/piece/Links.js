import React, { useEffect, useState } from 'react'
import { createPieceUrl, getApiData } from '../../utils/utilFunctions'
import { Link, Container } from './linkStyle';

const PrevLink = ({ id }) => {
	const url = useGetUrl(id, 'prev');
	return (
		url && <Link href={url}>Prev</Link>
	)
}

const NextLink = ({ id }) => {
	const url = useGetUrl(id, 'next');
	return (
		url && <Link href={url}>Next</Link>
	)
}
const Links = ({ id }) => {
	return (
		<Container>
			<div>
				<PrevLink id={id} />
				<NextLink id={id} />
			</div>
		</Container>
	)
}

function useGetUrl(id, dir) {
	const [data, setData] = useState(null);
	const [url, setUrl] = useState(null);
	useEffect(() => {
		const source = getApiData(`/api/pieces/${dir}/${id}`, setData);
		return () => {
			source.cancel('Component was unmounted, axios request is cancelled.');
		};
	}, [id]);
	useEffect(() => {
		if (data) {
			const { last_name, opera_id, opera, id, title } = data;
			setUrl(createPieceUrl(last_name, opera_id, opera, id, title))
		}
	}, [data])

	return url
}

export { Links }