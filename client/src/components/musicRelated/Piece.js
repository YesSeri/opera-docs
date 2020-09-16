import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
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
  }, []);

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
          <h2>{opera}</h2>
          <h3>{title}</h3>
          <Container fluid>
            <Row>
              <Col xs={12}>
                <img
                  style={{ width: '32rem' }}
                  className="img-thumbnail"
                  variant="top"
                  src={`https://singcademy.com/wp-content/uploads/composerPics/${last_name.toLowerCase()}.jpeg`}
                />
              </Col>
            </Row>
            <Row>
              <Col style={{ width: '32rem' }}>
                <Card.Title>{`${last_name}`}</Card.Title>
                <p>
                  This is {testArticle(type)} by {first_name}. It is the{' '}
                  {ordinal_suffix_of(placement)} piece in {opera}
                </p>
                <p>{description}</p>
                {/* </Card> */}
              </Col>
            </Row>
          </Container>
        </>
      );
    }
    return renderPiece;
  };
  const testArticle = (type) => {
    const pattern = /^([aeiou])/i;
    if (pattern.test(type)) {
      return `an ${type}`;
    } else {
      return `a ${type}`;
    }
  };
  function ordinal_suffix_of(i) {
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
  }
  return (
    <>
      {data ? PieceInfo() : null}
      {data ? <ScoreFrame filename={data.file_title} /> : null}
    </>
  );
}

export default Piece;
