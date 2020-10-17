import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { createOperaUrl } from '../helper/HelperFunctions';
// import Row from 'react-bootstrap/Row';
import { getApiData } from '../helper/HelperFunctions';

function Operas() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const source = getApiData(`/api/operas/`, setData); // Return is an axios cancel token. Used if component gets unmounted before request is completed.
    return () => {
      source.cancel('Component was unmounted, axios request is cancelled.');
    };
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
      <Container className='musicContainer'>{data ? operaPieces() : null}</Container>
    </>
  );
}

export default Operas;
