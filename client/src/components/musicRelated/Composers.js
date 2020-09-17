import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import { createComposerUrl } from '../helper/HelperFunctions';

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
      return data.map(({id, last_name, first_name}) => {
      const url = createComposerUrl(last_name)
        return (
          <Row key={id}>
            <Col>
              <Nav.Link href={`/${last_name.toLowerCase()}`}>{`${last_name}, ${first_name}`}</Nav.Link >
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
