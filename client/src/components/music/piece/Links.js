import React, { useEffect, useState } from 'react'
import { createPieceUrl, getApiData } from '../../utils/utilFunctions'
import { Link, Container } from './linkStyle';

const Links = ({ id }) => {
	const [prevUrl, nextUrl] = useGetUrls(id);
	return (
		<Container>
			{prevUrl && <Link href={prevUrl}>Prev</Link>}
			{nextUrl && <Link href={nextUrl}>Next</Link>}
		</Container>
	)
}

function useGetUrls(id) {
	const [prevData, setPrevData] = useState(null);
	const [nextData, setNextData] = useState(null);
	const [prevUrl, setPrevUrl] = useState(null);
	const [nextUrl, setNextUrl] = useState(null);
	useEffect(() => {
		const prevSource = getApiData(`/api/pieces/prev/${id}`, setPrevData);
		const nextSource = getApiData(`/api/pieces/next/${id}`, setNextData);
		return () => {
			prevSource.cancel('Component was unmounted, axios request is cancelled.');
			nextSource.cancel('Component was unmounted, axios request is cancelled.');
		};
	}, [id]);
	useEffect(() => {
		if (prevData) {
			const { last_name, opera_id, opera, id, title } = prevData;
			setPrevUrl(createPieceUrl(last_name, opera_id, opera, id, title))
		}
		if (nextData) {
			const { last_name, opera_id, opera, id, title } = nextData;
			setNextUrl(createPieceUrl(last_name, opera_id, opera, id, title))
		}
	}, [prevData, nextData])

	return [prevUrl, nextUrl]
}

export default Links