import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Composer() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    axios
      .get(`/api/composers/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        if (err) throw err;
      });
    return () => {};
  }, []);

  const composersOperas = () => {
    const operas = data.map((el) => {
      const id = el.opera_id;
      return (
        <div key={id}>
          <Link to={`/opera/${id}`}>{`${el.opera}`}</Link>
          <br />
        </div>
      );
    });
    return operas;
  };
  return (
    <div className="container">
      <div className="innerContainer">
        
        <h1>{data ? `${data[0].first_name} ${data[0].last_name}` : null}</h1>
        {data ? composersOperas() : null}
        </div>
    </div>
  );
}

export default Composer;
