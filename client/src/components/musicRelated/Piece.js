import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Frame from '../Frame';
import {getApiData} from '../helper/HelperFunctions'

function Piece(props) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const { pieceIdName } = props.match.params;
    const id = pieceIdName.replace(/(^\d+)(.+$)/i, '$1');
    const source = getApiData(`/api/pieces/${id}`, setData)
    return () => {
      source.cancel('Component was unmounted, axios request is cancelled.');
    };
  }, [props.match.params]);

  const PieceInfo = () => {
    const {
      title,
      opera,
      type,
      first_name,
      last_name,
    } = data;
    let renderPiece = '';
    if (title) {
      renderPiece = (
        <>
          <h2 style={{paddingTop: '20px'}}>{title}</h2>
          <Row xs={1} md={3} style={{paddingTop: '30px'}}>
            <Col>
              <b>Type: </b> {type.charAt(0).toUpperCase() + type.slice(1)}
            </Col>
            <Col>
              <b>Opera: </b>
              {opera}
            </Col>
            <Col>
              <b> Composer: </b>
              {`${last_name}, ${first_name}`}
            </Col>
          </Row>
        </>
      );
    }
    return renderPiece;
  };

  return (
    <>
      {data ? PieceInfo() : null}
      {data ? <Frame downloadLink={`https://singcademy.com/wp-content/uploads/pdfsToBeAccessed/${data.file_title}`} />: null}
      <Col>
      </Col>
    </>
  );
}

export default Piece;
