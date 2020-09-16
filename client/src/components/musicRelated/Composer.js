import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

function Composer() {
  const [data, setData] = useState(null);
  // const [wikiData, setWikiData] = useState(null);
  useEffect(() => {
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);

    axios
      .get(`/api/composers/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        if (err) console.error(err);
      });
  }, []);

  const composersOperas = () => {
    const operas = data.map((el) => {
      const { opera_id, opera } = el;
      return (
        <div key={opera_id}>
          <Link to={`/opera/${opera_id}`}>{`${opera}`}</Link>
        </div>
      );
    });
    return operas;
  };

  const composerInfo = () => {
    const { last_name } = data[0];
    return (
      <Container fluid>
        <Col xs={12}>
          <img
            alt={`pictureOf${last_name}`}
            style={{
              borderRadius: '10px',
              width: '100%',
              height: 'auto',
              maxWidth: '36rem',
            }}
            variant="top"
            src={`https://singcademy.com/wp-content/uploads/composerPics/${last_name.toLowerCase()}.jpeg`}
          />
        </Col>
      </Container>
    );
  };
  return (
    <div>
      <h1>{data ? `${data[0].first_name} ${data[0].last_name}` : null}</h1>
      {data ? composerInfo() : null}
      {data ? composersOperas() : null}
    </div>
  );
}

export default Composer;
