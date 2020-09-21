import { useEffect, useRef } from 'react';
import axios from 'axios';
//Not used
export const indeterminateArticleOf = (type) => {
  const pattern = /^([aeiou])/i;
  if (pattern.test(type)) {
    return `an ${type}`;
  } else {
    return `a ${type}`;
  }
};
// Not used
export const ordinalSuffixOf = (i) => {
  var j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return i + 'st';
  }
  if (j === 2 && k !== 12) {
    return i + 'nd';
  }
  if (j === 3 && k !== 13) {
    return i + 'rd';
  }
  return i + 'th';
};
// Not used
export function useInterval(callback, delay) {
  // https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

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