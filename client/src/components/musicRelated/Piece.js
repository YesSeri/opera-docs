import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import ScoreFrame from '../ScoreFrame';
import PdfFrame from '../PdfFrame';
import {indeterminateArticleOf, ordinalSuffixOf} from '../helper/HelperFunctions';

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
                  alt={`pictureOf${last_name}`}
                  style={{ borderRadius: '10px', width: '100%', height: 'auto', maxWidth: '36rem' }}
                  variant="top"
                  src={`https://singcademy.com/wp-content/uploads/composerPics/${last_name.toLowerCase()}.jpeg`}
                />
              </Col>
            </Row>
            <Row>
              <Col style={{ width: '32rem' }}>
                <h3>{`${last_name}`}</h3>
                <p>
                  This is {indeterminateArticleOf(type)} by {first_name}. It is{' '}
                  {type === 'score'
                    ? `a vocal score for ${opera}.`
                    : `the ${ordinalSuffixOf(placement)} piece in ${opera}.`}
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

  return (
    <>
      {data ? PieceInfo() : null}
      {data ? <PdfFrame filename={data.file_title} /> : null}
    </>
  );
}

export default Piece;
