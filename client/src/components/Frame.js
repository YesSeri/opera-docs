import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { StyledIframe } from './css/styComp';
const Spinner = require('react-spinkit');

export default function Frame({ downloadLink }) {
  const [loading, setLoading] = useState(true);

  return (
    <StyledIframe>
      <Container fluid>
        <Row
          style={{ visibility: loading ? 'visible' : 'hidden' }}
          className="justify-content-center"
        >
          <Spinner name="double-bounce" />
        </Row>
        <Row>
          <Col
            style={{ visibility: loading ? 'hidden' : 'visible' }}
            className="frameContainer"
            xl={{ span: 10, offset: 1 }}
          >
            <object
              onLoad={() => setLoading(false)}
              data={downloadLink}
              type="application/pdf"
            >
              <iframe
                title="pdfFrame"
                onLoad={() => setLoading(false)}
                src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${downloadLink}`}
              ></iframe>
            </object>
          </Col>
        </Row>
        {/* <Row>
          {loading ? (
            <Col>
              <a href={downloadLink}>Download here</a> if your browser doesn't
                support in browser PDF-viewer
            </Col>
          ) : null}
        </Row> */}
      </Container>
    </StyledIframe>
  );
}
