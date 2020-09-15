import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Composers() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/composers/`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        if (err) console.error(err);
      });
  });

  const renderComposer = () => {
    const view = [];
    if (data) {
      data.forEach((el) => {
        view.push(
          <div key={el.id}>
            <Link
              to={`/composer/${el.id}`}
            >{`${el.last_name}, ${el.first_name}`}</Link>
          </div>
        );
      });
      return view;
    }
  };

  return (
    <>
      <h2>Composers</h2>
      <p>Click to see operas by the respective composers.</p>
      {renderComposer()}
    </>
  );
}

export default Composers;
