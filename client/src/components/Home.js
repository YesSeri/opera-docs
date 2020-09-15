import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { LinkGrid } from './css/styComp';
import lunr from 'lunr';

const SearchBar = ({ setResults }) => {
  const [index, setIndex] = useState(null);
  const [data, setData] = useState(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/search');
      const json = await response.json();
      setData(await assignIndex(json)); // Add an index here so the
      setIndex(await createIndex(json));
    }
    fetchData();
  }, []);

  function createIndex(json) {
    return lunr(function () {
      this.ref('jsonId');
      this.field('title', { boost: 10 });
      this.field('opera');
      this.field('last_name');
      json.forEach(function (piece) {
        this.add(piece);
      }, this);
    });
  }
  function assignIndex(json) {
    // Gives an index, from 1 to max that will be used later to match the search in the index back to
    return json.map((el, i) => {
      el.jsonId = i;

      return el;
    });
  }

  useEffect(() => {
    // console.log(`Index Value: ${index}`)
    if (value.length > 2 && index) {
      const results = index.search(`${value}~1`).map(function (result) {
        return data[result.ref];
      });
      setResults(results);
    } else {
      setResults(null);
    }
  }, [value, index, data, setResults]);

  return (
    <>
      <form>
        <label>
          <input
            type="text"
            name="name"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </label>
      </form>
    </>
  );
};

function SearchResults(props) {
  if (props.results) {
    return props.results.map((result, i) => {
      return (
        <Row>
          <Col>
            <Nav.Link href={`/piece/${result.piece_id}`}>
              {result.title}
            </Nav.Link>
          </Col>
          <Col>{result.opera}</Col>
          <Col>{`${result.last_name}, ${result.first_name}`}</Col>
        </Row>
      );
    });
  } else return null;
}
function Home() {
  const [results, setResults] = useState(null);
  useEffect(() => {}, [results]);
  return (
    <>
      <h2>Home</h2>
      <SearchBar setResults={setResults}></SearchBar>
      <Container>
        <SearchResults results={results}></SearchResults>
      </Container>
    </>
  );
}

export default Home;
