import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Fuse from 'fuse.js';
import Nav from 'react-bootstrap/Nav';
import { createPieceUrl } from '../helper/HelperFunctions';
import { createComposerUrl } from '../helper/HelperFunctions';
import { createOperaUrl } from '../helper/HelperFunctions';
import { StyledResults } from '../css/styComp';

// I have to make three seperate searches. One for each category, composer, opera and piece. Here I define what the options for the searches should be. It doesn't need to be sorted, because I will have to combine the three lists myself into one big, and compare the search scores of the big array to discover which order of matching.
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
function composerPost(result, className, index = null) {
  const { last_name, first_name } = result.item;
  const url = createComposerUrl(last_name);
  return (
    <Col key={index}>
      <Nav.Link
        className={className}
        href={url}
      >{`${last_name}, ${first_name}`}</Nav.Link>
    </Col>
  );
}
function operaPost(result, className, index = null) {
  const { opera_id, opera, last_name } = result.item;
  const url = createOperaUrl(last_name, opera_id, opera);
  return (
    <Col key={index}>
      <Nav.Link className={className} href={url}>{`${opera}`}</Nav.Link>
    </Col>
  );
}

function piecePost(result, className, index = null) {
  const { title, piece_id, last_name, opera_id, opera, type } = result.item;
  const url = createPieceUrl(last_name, opera_id, opera, piece_id, title);
  return (
    <Col key={index}>
      <Nav.Link className={className} href={url}>
        {type === 'ouverture' ? `${title} - ${opera}` : title}
      </Nav.Link>
    </Col>
  );
}
function search(data, resultType, optionsType, searchValue) {
  const fuse = new Fuse(data, optionsType);
  const search = fuse.search(searchValue);
  return search.map(function (el) {
    var o = Object.assign({}, el);
    o.resultType = resultType;
    return o;
  });
}
export default function SearchResults({ searchValue }) {
  const [pieces, setPieces] = useState(null);
  const [operas, setOperas] = useState(null);
  const [composers, setComposers] = useState(null);
  const [results, setResults] = useState(null);
  useEffect(() => {
    axios.get('/api/search')    .then(({ data }) => setPieces(data));
    axios.get('/api/operas')    .then(({ data }) => setOperas(data));
    axios.get('/api/composers') .then(({ data }) => setComposers(data));
  }, []);

  useEffect(() => {
    if (searchValue.length > 1) { //Don't search if search if only one char. It is pointless, the results dont make sense. 
      const allArray = [];
      if (pieces)
        allArray.push(search(pieces, 'piece', optionsPieces, searchValue));
      if (operas)
        allArray.push(search(operas, 'opera', optionsOperas, searchValue));
      if (composers)
        allArray.push(
          search(composers, 'composer', optionsComposers, searchValue)
        );
      setResults(sortArrays(allArray[0], allArray[1], allArray[2]));
    } else {
      setResults(null);
    }
  }, [searchValue, pieces, operas, composers]);

  function sortArrays(arr1, arr2, arr3) { // Sort the array so the objects with the best search scores are first.
    let result = [...(arr1 || []), ...(arr2 || []), ...(arr3 || [])];
    return result.sort((a, b) => a.score - b.score);
  }
  function TopResult() {
    let topResult = results[0];
    if (topResult === undefined) return <></>;
    const className = 'topResult';
    switch (topResult.resultType) {
      case 'composer': {
        return composerPost(topResult, className);
      }
      case 'opera': {
        return operaPost(topResult, className);
      }
      case 'piece': {
        return piecePost(topResult, className);
      }
      default:
        return <></>;
    }
  }
  function OtherResults() {
    if (results[1] === undefined) return <></>;
    const otherResults = [];
    const className = 'otherResult';
    for (let i = 1; i < 25; i++) {
      // Shows a maximum of 25 search results. Probably overkill to be honest. Undefined means that I have not found that many results, and should show all the results found, and not more.
      if (results[i] === undefined) break;
      otherResults.push(results[i]);
    }
    return otherResults.map((result, index) => {
      let container;
      switch (result.resultType) {
        case 'composer': {
          return composerPost(result, className, index);
        }
        case 'opera': {
          return operaPost(result, className, index);
        }
        case 'piece': {
          return piecePost(result, className, index);
        }
        default:
          container = <></>;
      }
      return container;
    });
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
