import axios from 'axios';
import diacritics from 'diacritics';

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
  const safeTitle = diacritics.remove(title.replace(/\s+/g, '-').toLowerCase());
  const endUrl = `${piece_id}-${safeTitle}`;
  const startUrl = createOperaUrl(lastName, opera_id, opera);
  const url = `${startUrl}/${endUrl}`;
  return url;
}

export function createOperaUrl(lastName, opera_id, opera) {
  return `/${createComposerUrl(lastName)}/${opera_id}-${diacritics.remove(
    opera.replace(/\s+/g, '-').toLowerCase()
  )}`; // url = lastname/id-opera
}

export function createComposerUrl(lastName) {
  return lastName.toLowerCase().replace(" ", "_");
}
