import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Operas() {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get(`/api/operas/`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        if (err) console.error(err);
      });
    return () => {};
  }, []);

  const operaPieces = () => {
    const operas = data.map((el) => {
      return (
        <div key={el.id}>
          <Link to={`/opera/${el.id}`}>{`${el.opera}`}</Link>
          <br />
        </div>
      );
    });
    return operas;
  };
  return (
    <>
        <h1>Operas</h1>
        {data ? operaPieces() : null}
    </>
  );
}

export default Operas;