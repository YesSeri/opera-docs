import axios from 'axios';

export function getApiData(url, setData) {
	const source = axios.CancelToken.source();
	axios
		.get(url, {
			cancelToken: source.token,
		})
		.then((response) => {
			setData(response.data)
		})
		.catch((err) => {
			if (err) console.error(err);
		});
	return source;
}

export function createPieceUrl(lastName, opera_id, opera, piece_id, title) {
	const startUrl = `/${lastName}/${opera_id}-${opera}`
	const endUrl = `${piece_id}-${title}`;
	return encodeURI(`${startUrl}/${endUrl}`)
}

export function createOperaUrl(lastName, opera_id, opera) {
	const startUrl = `/${lastName}`;
	const endUrl = `${opera_id}-${opera}`;
	return encodeURI(`${startUrl}/${endUrl}`)
}

export function createComposerUrl(lastName) {
	return encodeURI(lastName);
}
