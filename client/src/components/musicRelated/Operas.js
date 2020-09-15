import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
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
        <Row>
        <Col key={el.id}>
          <Nav.Link to={`/opera/${el.id}`}>{`${el.opera}`}</Nav.Link>
        </Col>
</Row>
      );
    });
    return operas;
  };
  return (
    <>
      <h2>Operas</h2>
      <Container>
          {data ? operaPieces() : null}
      </Container>
    </>
  );
}

export default Operas;
