import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Frame from '../Frame';
import {
  indeterminateArticleOf,
  ordinalSuffixOf,
} from '../helper/HelperFunctions';

function Piece(props) {
  const [data, setData] = useState(null);
  const [downloadLink, setDownloadlink] = useState(null);
  useEffect(() => {
    const { pieceIdName } = props.match.params;
    const id = pieceIdName.replace(/(^\d+)(.+$)/i, '$1');
    axios
      .get(`/api/pieces/${id}`)
      .then((response) => {
        setDownloadlink(
          `https://singcademy.com/wp-content/uploads/pdfsToBeAccessed/${response.data.file_title}`
        );
        return response;
      })
      .then((response) => setData(response.data))
      .catch((err) => {
        if (err) console.error(err);
      });
  }, [props.match.params]);

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
          <h1>{opera}</h1>
          <h3>{`${last_name}`}</h3>
          <Container fluid>
            <Row>
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
            </Row>
            <Row>
              <Col style={{ width: '32rem' }}>
          <h3>{title}</h3>
                <p>
                  This is {indeterminateArticleOf(type)} by {first_name}. It is{' '}
                  {type === 'score'
                    ? `a vocal score for ${opera}.`
                    : `the ${ordinalSuffixOf(placement)} piece in ${opera}.`}
                </p>
                <p>{description}</p>
                <p>
                  Either view the score here,{' '}
                  <a href={downloadLink}>download it</a>
                </p>
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
      <Frame downloadLink={downloadLink} />
    </>
  );
}

export default Piece;
