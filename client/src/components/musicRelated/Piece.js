import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScoreFrame from '../ScoreFrame';

function Piece() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    axios
      .get(`/api/pieces/${id}`)
      .then((response) => setData(response.data))
      .catch((err) => {
        if (err) console.error(err);
      });
  });

  const PieceInfo = () => {
    const {
      title,
      opera,
      description,
      type,
      first_name,
      last_name,
      placement,
    } = data;
    let renderPiece = '';
    if (title) {
      renderPiece = (
        <>
          <h2>{title}</h2>
          <h3>{opera}</h3>
          <p>{description}</p>
          <p>It is a {type}</p>
          <p>{`${first_name} ${last_name}`}</p>
          <p>Number {placement} in the opera</p>
        </>
      );
    }
    return renderPiece;
  };
  return (
    <>
      {this.state.data ? PieceInfo() : null}
      {this.state.data ? (
        <ScoreFrame filename={this.state.data.file_title} />
      ) : null}
    </>
  );
}

export default Piece;
