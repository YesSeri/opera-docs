import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
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
        <Col key={el.id}>
          <Link to={`/opera/${el.id}`}>{`${el.opera}`}</Link>
        </Col>
      );
    });
    return operas;
  };
  return (
    <>
      <h2>Operas</h2>
      <Container>
        <Row  xs={2}> { data ? operaPieces() : null}</Row>
      </Container>
    </>
  );
}

export default Operas;
