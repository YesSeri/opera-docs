import React, { useState } from 'react';
import SearchResults from './SearchResults';
import SearchBar from './SearchBar';
import Banner from './Banner';
import Container from 'react-bootstrap/Container';

function Search() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <Container fluid className="searchContainer">
      <h1>Search</h1>
      <Banner></Banner>
      <SearchBar setSearchValue={setSearchValue}></SearchBar>
      <SearchResults searchValue={searchValue}></SearchResults>
    </Container>
  );
}

export default Search;
