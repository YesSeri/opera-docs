import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';

function Pieces() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/pieces/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((err) => {
        if (err) console.error(err);
      });
  }, []);

  const PiecesInfo = () => {
    const pieces = [];
    console.log(data);
    if (data) {
      data.forEach((el) => {
        pieces.push(
          <Row key={el.piece_id} xs={2} md={3}>
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
