import { useEffect, useState } from 'react'
import { createPieceUrl, getApiData } from '../../../utils/utilFunctions'

export function useGetUrl(id, dir) {
	const [data, setData] = useState(null);
	const [url, setUrl] = useState(null);
	useEffect(() => {
		const source = getApiData(`/api/pieces/${dir}/${id}`, setData);
		return () => {
			source.cancel('Component was unmounted, axios request is cancelled.');
		};
	}, [id, dir]);
	useEffect(() => {
		if (data) {
			const { last_name, opera_id, opera, id, title } = data;
			setUrl(createPieceUrl(last_name, opera_id, opera, id, title))
		}
	}, [data])

	return url
}

