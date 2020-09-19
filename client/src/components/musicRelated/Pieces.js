import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';

import { createPieceUrl } from '../helper/HelperFunctions';
import { createComposerUrl } from '../helper/HelperFunctions';
import { createOperaUrl } from '../helper/HelperFunctions';

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
        setData(response.data);
      })
      .catch((err) => {
        if (err) console.error(err);
      });
  }, []);

  const PiecesInfo = () => {
    const pieces = []; //p.id title o.id opera c.id c.lastname, c.firstname
    if (data) {
      data.forEach(
        ({
          piece_id,
          title,
          opera_id,
          opera,
          composer_id,
          last_name,
          first_name,
        }) => {
          const composerUrl = createComposerUrl(last_name);
          const operaUrl = createOperaUrl(last_name, opera_id, opera);
          const pieceUrl = createPieceUrl(
            last_name,
            opera_id,
            opera,
            piece_id,
            title
          );

          pieces.push(
            <Row
              style={{
                borderRadius: '10px',
                borderTop: 'solid #ddd 1px',
                borderRight: 'solid #ddd 1px',
                borderLeft: 'solid #ddd 1px',
              }}
              key={piece_id}
              xs={1}
              sm={3}
            >
              <Col>
                <Nav.Link href={pieceUrl}>{title}</Nav.Link>
              </Col>
              <Col>
                <Nav.Link href={operaUrl}>{opera}</Nav.Link>
              </Col>
              <Col>
                <Nav.Link
                  href={composerUrl}
                >{`${last_name}, ${first_name}`}</Nav.Link>
              </Col>
            </Row>
          );
        }
      );
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
