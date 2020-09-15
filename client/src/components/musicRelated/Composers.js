import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';

function Composers() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/composers/`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        if (err) console.error(err);
      });
  }, []);

  const renderComposers = () => {
    if (data) {
      return data.map((el) => {
        return (
          <Row key={el.id}>
            <Col>
              <Nav.Link href={`/composer/${el.id}`}>{`${el.last_name}, ${el.first_name}`}</Nav.Link >
            </Col>
          </Row>
        );
      });
    }
  };

  return (
    <>
      <h2>Composers</h2>
      <p>Click to see operas by the respective composers.</p>
      <Container>{renderComposers()}</Container>
    </>
  );
}

export default Composers;
