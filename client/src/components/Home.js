import React, { useState, useEffect } from 'react';
import lunr from 'lunr';
import './css/home.css'

const SearchBar = (props) => {
  const [index, setIndex] = useState(null);
  const [response, setResponse] = useState(null);
  const [data, setData] = useState(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:5000/api/search');
      const json = await response.json();
      const indexedJson = await assignIndex(json);
      const idx = await createIndex(json);

      setData(indexedJson);
      setIndex(idx);
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
    if (value.length > 2) {
      Search();
    } else {
      setResponse(null);
    }
  }, [value]);

  async function Search() {
    const results = await index.search(value).map(function (result) {
      console.log(result.ref)
      console.log(data)
      return data[result.ref];
    });
    if (results.length > 0) {
      setResponse(results);
      props.setResults(results);
    } else {
      setResponse(null);
    }
  }
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
      return(
      <div className='colContainer' key={i} >
        <p className="resContainer">
          {result.title}
        </p>
        <p className="resContainer">
          {result.opera}
        </p>
        <p className="resContainer">
          {`${result.last_name}, ${result.first_name}`}
        </p>
      </div>
      )
    });
  } else {
    return null;
  }
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
