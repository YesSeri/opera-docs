import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import lunr from 'lunr';
import './css/home.css';

<<<<<<< HEAD
const SearchBar = ({ setResults }) => {
=======
const SearchBar = (props) => {
>>>>>>> parent of b3ecb12... No more linter warning, fixed useeffect bug
  const [index, setIndex] = useState(null);
  const [response, setResponse] = useState(null);
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
<<<<<<< HEAD
      setResults(results);
    } else {
      setResults(null);
=======
      if (results.length > 0) {
        props.setResults(results);
      }
    } else {
      setResponse(null);
>>>>>>> parent of b3ecb12... No more linter warning, fixed useeffect bug
    }
  }, [value]);

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
        <div className="colContainer" key={i}>
          <div className="resContainer">
            <p>{result.title}</p>
          </div>
          <div className="resContainer">
            <p>{result.opera}</p>
          </div>
          <div className="resContainer">
            <p>{`${result.last_name}, ${result.first_name}`}</p>
          </div>
          <div className="resContainer">
            {console.log(result)}
            <Link to={`/post/${result.piece_id}`}>{result.title}</Link>
          </div>
        </div>
      );
    });
  } else return null;
}
function Home() {
  const [results, setResults] = useState(null);
  useEffect(() => {}, [results]);
  return (
    <div className="container">
      <div className="innerContainer">
        <SearchBar setResults={setResults}></SearchBar>
        <SearchResults results={results}></SearchResults>
      </div>
    </div>
  );
}

export default Home;
