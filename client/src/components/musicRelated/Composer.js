import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { createOperaUrl } from '../helper/HelperFunctions';

function Composer(props) {
  const [data, setData] = useState('');
  const { pathname } = props.location;
  // const [wikiData, setWikiData] = useState(null);
  useEffect(() => {
    const { lastName } = props.match.params;

    axios
      .get(`/api/composers/${lastName}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        if (err) console.error(err);
      });
  }, [props.match.params]);

  const composersOperas = () => {
    const operas = data.map(({last_name, opera_id, opera}) => {
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
    const { last_name } = data[0];
    return (
      <Container fluid>
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
    <div>
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
