import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Opera() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    axios
      .get(`/api/operas/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        if (err) console.error(err);
      });
    return () => {};
  }, []);

  const operaPieces = () => {
    const pieces = data.map((el) => {
      const weight = el.type === 'recitativo' || el.type === 'choir' ? 'normal' : 'bold';
      return (
        <div key={el.id}>
          {console.log(el)}
          <Link
            style={{ fontWeight: weight }}
            to={`/piece/${el.id}`}
          >{`${el.title}`}</Link>
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
