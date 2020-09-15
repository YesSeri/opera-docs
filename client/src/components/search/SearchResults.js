import React, { useState, useEffect, useRef } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Fuse from 'fuse.js';
import Nav from 'react-bootstrap/Nav';
import { StyledResults } from '../css/styComp';

const optionsPieces = {
  includeScore: true,
  shouldSort: false,
  keys: ['title'],
};
const optionsOperas = {
  includeScore: true,
  shouldSort: false,
  keys: ['opera'],
};

const optionsComposers = {
  includeScore: true,
  shouldSort: false,
  keys: ['last_name', 'first_name'],
};

export default function SearchResults({ searchValue }) {
  const [pieces, setPieces] = useState(null);
  const [operas, setOperas] = useState(null);
  const [composers, setComposers] = useState(null);
  const [pieceResults, setPieceResults] = useState([]);
  const [operaResults, setOperaResults] = useState([]);
  const [composerResults, setComposerResults] = useState([]);
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
        setPieceResults(searchResultType);
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
        setPieceResults(searchResultType);
        allArray.push(searchResultType);
      }
      if (composers) {
        const fuse = new Fuse(composers, optionsComposers);
        setComposerResults(fuse.search(searchValue));
        const search = fuse.search(searchValue);
        const searchResultType = search.map(function (el) {
          var o = Object.assign({}, el);
          o.resultType = 'composer';
          return o;
        });
        setPieceResults(searchResultType);
        allArray.push(searchResultType);
      }

      setResults(sortArrays(allArray[0], allArray[1], allArray[2]));
    }
  }, [searchValue, pieces, operas, composers]);

  function sortArrays(arr1, arr2, arr3) {
    let result = [...arr1, ...arr2, ...arr3];
    return result.sort((a, b) => a.score - b.score);
  }
  function TopResult() {
    let topResult = results[0];
    let container;
    const {
      piece_id,
      title,
      opera_id,
      opera,
      composer_id,
      last_name,
      first_name,
    } = topResult.item;
    switch (topResult.resultType) {
      case 'opera':
        container = (
          <Col>
            <Nav.Link className="topResult" href={`/opera/${opera_id}`}>
              {opera}
            </Nav.Link>
          </Col>
        );
        break;
      case 'composer':
        container = (
          <Col>
            <Nav.Link
              className="topResult"
              href={`/composer/${composer_id}`}
            >{`${last_name}, ${first_name}`}</Nav.Link>
          </Col>
        );
        break;
      case 'piece':
        container = (
          <Col>
            <Nav.Link className="topResult" href={`/piece/${piece_id}`}>
              {title}
            </Nav.Link>
          </Col>
        );
        break;
    }

    return container;
  }
  function OtherResults() {
    if (results[1] === undefined) return <></>;
    const otherResults = [];
    for (let i = 1; i < results.length || i > 5; i++) {
      if (results[i] === undefined) break;
      otherResults.push(results[i]);
    }
    const otherContainer = otherResults.map((el, i) => {
      let container;
      console.log(el);
      const {
        piece_id,
        title,
        opera_id,
        opera,
        composer_id,
        last_name,
        first_name,
      } = el.item;
      switch (el.resultType) {
        case 'opera':
          console.log('o');
          container = (
            <Nav.Link key={i} href={`/opera/${opera_id}`}>
              {opera}
            </Nav.Link>
          );
          break;
        case 'composer':
          container = (
            <Nav.Link
              key={i}
              href={`/composer/${composer_id}`}
            >{`${last_name}, ${first_name}`}</Nav.Link>
          );
          break;
        case 'piece':
          container = (
            <Nav.Link key={i} href={`/piece/${piece_id}`}>
              {title}
            </Nav.Link>
          );
          break;
      }
      return container;
    });

    return otherContainer;
  }

  return (
    <StyledResults>
      <Container>
        <Row>{results ? <TopResult /> : null}</Row>
        <Row xs={3}>{results ? <OtherResults /> : null}</Row>
      </Container>
    </StyledResults>
  );
}
