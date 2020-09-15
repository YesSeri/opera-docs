import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Fuse from 'fuse.js';
import Nav from 'react-bootstrap/Nav';
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
      if (pieces) {
        const fuse = new Fuse(pieces, optionsPieces);
        setPieceResults(fuse.search(searchValue));
      }
      if (operas) {
        const fuse = new Fuse(operas, optionsOperas);
        setOperaResults(fuse.search(searchValue));
      }
      if (composers) {
        const fuse = new Fuse(composers, optionsComposers);
        setComposerResults(fuse.search(searchValue));
      }
    }
  }, [searchValue, pieces, operas, composers]);

  function sortArrays(arr1, arr2, arr3) {
    let result = [...arr1, ...arr2, ...arr3];
    return result.sort((a, b) => a.score - b.score);
  }

  const RenderResults = () => {
    const results = sortArrays(pieceResults, operaResults, composerResults);
    const bestResult = results.shift();
    if (bestResult === undefined && searchValue.length > 4) {
      return <Row>Nothing has been found</Row>;
    }
    if (bestResult === undefined) return <></>
    const { item } = bestResult;
    if (item.name) {
      const {piece_id, title} = item
      return <Nav.Link href={`/piece/${piece_id}`}>{title}</Nav.Link>;
    } else if (item.opera) {
      const {opera_id, opera} = item
      return <Nav.Link href={`/opera/${opera_id}`}>{opera}</Nav.Link>;
    } else {
      const {composer_id, last_name, first_name} = item
      return (
        <Nav.Link
          href={`/composer/${composer_id}`}
        >{`${last_name}, ${first_name}`}</Nav.Link>
      );
    }

    return <h1>{}</h1>;
  };

  return (
    <Container>
      <RenderResults />
    </Container>
  );
}
