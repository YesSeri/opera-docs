import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

function Composer() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    axios
      .get(`/api/composers/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        if (err) console.error(err)
      });
  }, []);

  const composersOperas = () => {
    const operas = data.map((el) => {
      const id = el.opera_id;
      return (
        <div key={id}>
          <Container>
            <Col>
              <Card style={{ margin: 'auto', width: '26rem' }}>
                <Card.Img
                  variant="top"
                  src={`https://singcademy.com/wp-content/uploads/composerPics/${el.last_name.toLowerCase()}.jpeg`}
                />
                <Card.Body>
                  <Card.Title>{`${el.last_name}`}</Card.Title>
                  <Card.Text>
                    Info about the composer.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Container>
          <Link to={`/opera/${id}`}>{`${el.opera}`}</Link>
          <br />
        </div>
      );
    });
    return operas;
  };
  return (
    <div>
        <h1>{data ? `${data[0].first_name} ${data[0].last_name}` : null}</h1>
        {data ? composersOperas() : null}
    </div>
  );
}

export default Composer;
