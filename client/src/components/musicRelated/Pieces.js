import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { LinkGrid } from '../css/styComp';

function Pieces() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/pieces/`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        if (err) console.error(err);
      });
  });

  const PiecesInfo = () => {
    const pieces = [];
    if (data) {
      data.forEach((el) => {
        pieces.push(
          <Row xs={2} md={3}>
            <Col>
              <Nav.Link href={`/piece/${el.piece_id}`}>{el.title}</Nav.Link>
            </Col>
            <Col>
              <Nav.Link href={`/opera/${el.opera_id}`}>{el.opera}</Nav.Link>
            </Col>
            <Col>
              <Nav.Link
                href={`/composer/${el.composer_id}`}
              >{`${el.last_name}, ${el.first_name}`}</Nav.Link>
            </Col>
          </Row>
        );
      });
    }
    return pieces;
  };
  return (
    <>
      <h2>Pieces</h2>
      <Container>{data ? PiecesInfo() : null}</Container>
    </>
  );
}

export default Pieces;
