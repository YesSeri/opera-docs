import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Opera(props) {
  const [data, setData] = useState(null);
  const {pathname} = props.location
  useEffect(() => {
    
    const {operaIdName} = props.match.params
    const id = operaIdName.replace(/(^\d+)(.+$)/i,'$1')
    axios
      .get(`/api/operas/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        if (err) console.error(err);
      });
    return () => {};
  }, [props.match.params]);

  const operaPieces = () => {
    const pieces = data.map(({title, id, type}) => {
      const safeTitle = title.replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, '-').toLowerCase()
      const url = `${id}-${safeTitle}`
      
      const weight =
        type === 'recitativo' || type === 'choir' || type === 'intermezzo' ? 'normal' : 'bold';
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
