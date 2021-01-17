import axios from 'axios';

export function getApiData(url, setData) {
	const source = axios.CancelToken.source();
	axios
		.get(url, {
			cancelToken: source.token,
		})
		.then((response) => setData(response.data))
		.catch((err) => {
			if (err) console.error(err);
		});
	return source;
}

export function createPieceUrl(lastName, opera_id, opera, piece_id, title) {
	const endUrl = `${piece_id}-${title}`;
	const startUrl = createOperaUrl(lastName, opera_id, opera);
	return encodeURI(`${startUrl}/${endUrl}`)
}

export function createOperaUrl(lastName, opera_id, opera) {
	const url =  encodeURI(`/${createComposerUrlUnencoded(lastName)}/${opera_id}-${opera}`);
	return url
}

export function createOperaUrlUnencoded(lastName, opera_id, opera) {
	return `/${createComposerUrlUnencoded(lastName)}/${opera_id}-${opera}`;
}

export function createComposerUrl(lastName) {
	return encodeURI(lastName);
}

export function createComposerUrlUnencoded(lastName) {
	return lastName;
}