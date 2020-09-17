import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Fuse from 'fuse.js';
import Nav from 'react-bootstrap/Nav';
import { createPieceUrl } from '../helper/HelperFunctions';
import { StyledResults } from '../css/styComp';

const optionsPieces = {
  includeScore: true,
  shouldSort: false,
  location: true,
  keys: ['title'],
};
const optionsOperas = {
  includeScore: true,
  shouldSort: false,
  location: true,
  keys: ['opera'],
};

const optionsComposers = {
  includeScore: true,
  shouldSort: false,
  location: true,
  keys: ['last_name', 'first_name'],
};

export default function SearchResults({ searchValue }) {
  const [pieces, setPieces] = useState(null);
  const [operas, setOperas] = useState(null);
  const [composers, setComposers] = useState(null);
  const [results, setResults] = useState(null);
  useEffect(() => {
    axios.get('/api/search').then(({ data }) => {
      setPieces(data);
    });
    axios.get('/api/operas').then(({ data }) => {
      setOperas(data);
    });
    axios.get('/api/composers').then(({ data }) => {
      setComposers(data);
    });
  }, []);

  useEffect(() => {
    if (searchValue.length > 2) {
      const allArray = [];
      if (pieces) {
        const fuse = new Fuse(pieces, optionsPieces);
        const search = fuse.search(searchValue);
        const searchResultType = search.map(function (el) {
          var o = Object.assign({}, el);
          o.resultType = 'piece';
          return o;
        });
        allArray.push(searchResultType);
      }
      if (operas) {
        const fuse = new Fuse(operas, optionsOperas);
        const search = fuse.search(searchValue);
        const searchResultType = search.map(function (el) {
          var o = Object.assign({}, el);
          o.resultType = 'opera';
          return o;
        });
        allArray.push(searchResultType);
      }
      if (composers) {
        const fuse = new Fuse(composers, optionsComposers);
        const search = fuse.search(searchValue);
        const searchResultType = search.map(function (el) {
          var o = Object.assign({}, el);
          o.resultType = 'composer';
          return o;
        });
        allArray.push(searchResultType);
      }

      setResults(sortArrays(allArray[0], allArray[1], allArray[2]));
    } else {
      setResults(null);
    }
  }, [searchValue, pieces, operas, composers]);

  function sortArrays(arr1, arr2, arr3) {
    let result = [...(arr1 || []), ...(arr2 || []), ...(arr3 || [])];
    return result.sort((a, b) => a.score - b.score);
  }
  function TopResult() {
    let topResult = results[0];
    if (topResult === undefined) return <></>;
    let container;
    switch (topResult.resultType) {
      case 'opera': {
        const { opera_id, opera, last_name } = topResult.item;
        const endUrl = `${opera_id}-${opera.replace(/\s+/g, '-')}`;
        return (
          <Col>
            <Nav.Link
              className="topResult"
              href={`${last_name}/${endUrl}`}
            >{`${opera}`}</Nav.Link>
          </Col>
        );
      }
      case 'composer': {
        const { last_name, first_name } = topResult.item;
        return (
          <Col>
            <Nav.Link
              className="topResult"
              href={`/${last_name.toLowerCase()}`}
            >{`${last_name}, ${first_name}`}</Nav.Link>
          </Col>
        );
      }
      case 'piece': {
        const {
          title,
          piece_id,
          last_name,
          opera_id,
          opera,
          type,
        } = topResult.item;
        const url = createPieceUrl(last_name, opera_id, opera, piece_id, title);
        return (
          <Col>
            <Nav.Link
              className="topResult"
              href={url}
            >
              {type === 'ouverture' ? `${title} - ${opera}` : title}
            </Nav.Link>
          </Col>
        );
      }
      default:
        container = <></>;
    }

    return container;
  }
  function OtherResults() {
    if (results[1] === undefined) return <></>;
    const otherResults = [];
    for (let i = 1; i < 25; i++) {
      if (results[i] === undefined) break;
      otherResults.push(results[i]);
    }
    const otherContainer = otherResults.map((el, i) => {
      let container;
      switch (el.resultType) {
        case 'opera': {
          const { opera_id, opera, last_name } = el.item;
          const operaUrl = `${opera_id}-${opera.replace(/\s+/g, '-')}`;
          return (
            <div key={i}>
              <Nav.Link href={`${last_name}/${operaUrl}`}>{`${opera}`}</Nav.Link>
            </div>
          );
        }
        case 'composer': {
          const { last_name, first_name } = el.item;
          return (
            <Col key={i}>
              <Nav.Link
                href={`/${last_name.toLowerCase()}`}
              >{`${last_name}, ${first_name}`}</Nav.Link>
            </Col>
          );
        }
        case 'piece': {
          const { title, piece_id, last_name, opera_id, opera, type } = el.item;
          const url = createPieceUrl(
            last_name,
            opera_id,
            opera,
            piece_id,
            title
          );
          return (
            <Nav.Link key={i} href={url}>
              {type === 'ouverture' ? `${title} - ${opera}` : title}
            </Nav.Link>
          );
        }
        default:
          container = <></>;
      }
      return container;
    });

    return otherContainer;
  }

  return (
    <StyledResults>
      <Container>
        <Row>{results ? <TopResult /> : null}</Row>
        <Row xs={1} sm={1} md={3}>
          {results ? <OtherResults /> : null}
        </Row>
      </Container>
    </StyledResults>
  );
}
