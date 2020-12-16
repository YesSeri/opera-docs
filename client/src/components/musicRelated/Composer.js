import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet'
import { createOperaUrl } from '../helper/HelperFunctions';
import {getApiData} from '../helper/HelperFunctions'

function Composer(props) {
  const [data, setData] = useState('');
  useEffect(() => {
    const { lastName } = props.match.params;
    console.log(lastName)
    const source = getApiData(`/api/composers/${lastName}`, setData) // Return is an axios cancel token. Used if component gets unmounted before request is completed. 
    return () => {
      source.cancel('Component was unmounted, axios request is cancelled.');
    };
  }, [props.match.params]);

  const composersOperas = () => {
    const operas = data.map(({ last_name, opera_id, opera }) => {
      const url = createOperaUrl(last_name, opera_id, opera);
      return (
        <Col key={opera_id}>
          <Nav.Link href={url}>{`${opera}`}</Nav.Link>
        </Col>
      );
    });
    return operas;
  };

  const composerInfo = () => {
    if (data[0] === undefined) return <Col>Nothing found</Col>;
    const { last_name, first_name } = data[0];
    return (
      <Container fluid>
        <Helmet>
            <title>
              operadocs - Operas by {`${first_name} ${last_name}`}
            </title>
        </Helmet>
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
      </Container>
    );
  };
  return (
    <div className='musicContainer'>
      <h1>
        {data && data[0] !== undefined
          ? `${data[0].first_name} ${data[0].last_name}`
          : null}
      </h1>
      {data ? composerInfo() : null}
      {data ? composersOperas() : null}
    </div>
  );
}

export default Composer;
