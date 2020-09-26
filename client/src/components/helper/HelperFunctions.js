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
  const safeTitle = title
    .replace(/[^a-zA-Z ]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
  const pieceUrl = `${piece_id}-${safeTitle}`;
  const operaUrl = `${opera_id}-${opera.replace(/\s+/g, '-').toLowerCase()}`;
  const url = `/${lastName.toLowerCase()}/${operaUrl}/${pieceUrl}`;
  return url
}

export function createOperaUrl(lastName, opera_id, opera) {
  return `/${lastName.toLowerCase()}/${opera_id}-${opera.replace(/\s+/g, '-').toLowerCase()}` // url = lastname/id-opera
}

export function createComposerUrl(lastName) {
  return lastName.toLowerCase()
}