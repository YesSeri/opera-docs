import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getApiData } from '../helper/HelperFunctions';

function Opera(props) {
  const [data, setData] = useState(null);
  const { pathname } = props.location;
  useEffect(() => {
    const { operaIdName } = props.match.params;
    const id = operaIdName.replace(/(^\d+)(.+$)/i, '$1');
    const source = getApiData(`/api/operas/${id}`, setData); // Return is an axios cancel token. Used if component gets unmounted before request is completed.
    return () => {
      source.cancel('Component was unmounted, axios request is cancelled.');
    };
  }, [props.match.params]);

  const operaPieces = () => {
    const pieces = data.map(({ title, id, type }) => {
      const safeTitle = title
        .replace(/[^a-zA-Z ]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase();
      const url = `${id}-${safeTitle}`;

      const weight =
        type === 'recitativo' || type === 'choir' || type === 'intermezzo'
          ? 'normal'
          : 'bold';
      return (
        <div key={id}>
          <Link
            style={{ fontWeight: weight }}
            to={`${pathname}/${url}`}
          >{`${title}`}</Link>
          <br />
        </div>
      );
    });
    return pieces;
  };
  return (
    <>
      {data ? <h1>{data[0].name}</h1> : data === null ? '' : 'Nothing here'}
      {data ? operaPieces() : null}
    </>
  );
}

export default Opera;
