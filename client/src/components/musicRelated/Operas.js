import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { createOperaUrl } from '../helper/HelperFunctions';
// import Row from 'react-bootstrap/Row';
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
    const operas = data.map(({ last_name, opera_id, opera }) => {
      const url = createOperaUrl(last_name, opera_id, opera);

      return (
        <Row key={opera_id}>
          <Col>
            <Nav.Link href={url}>{`${opera}`}</Nav.Link>
          </Col>
        </Row>
      );
    });
    return operas;
  };
  return (
    <>
      <h1>Operas</h1>
      <Container >{data ? operaPieces() : null}</Container>
    </>
  );
}

export default Operas;
